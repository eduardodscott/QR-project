import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/db'
import { sendEmail, getNewChatEmailTemplate } from '@/lib/email'

export async function POST(
  request: Request,
  { params }: { params: { chatId: string } }
) {
  try {
    const body = await request.json()
    const { content, type } = body

    if (!content || !type) {
      return NextResponse.json(
        { error: 'Content and type are required' },
        { status: 400 }
      )
    }

    // Validate content length for free text
    if (type === 'FREE_TEXT' && content.length > 200) {
      return NextResponse.json(
        { error: 'Message must be 200 characters or less' },
        { status: 400 }
      )
    }

    const chat = await prisma.chat.findUnique({
      where: { id: params.chatId },
      include: {
        qrCode: {
          include: {
            user: true,
          },
        },
        messages: true,
      },
    })

    if (!chat) {
      return NextResponse.json({ error: 'Chat not found' }, { status: 404 })
    }

    // Check if chat is expired
    if (chat.status === 'EXPIRED' || new Date(chat.expiresAt) < new Date()) {
      return NextResponse.json(
        { error: 'Chat has expired' },
        { status: 400 }
      )
    }

    const session = await getServerSession(authOptions)
    const senderId = session?.user?.id || null

    // Check message rules
    if (type === 'FREE_TEXT') {
      // Free text only allowed if owner has replied
      const hasOwnerReplied = chat.messages.some(
        (msg) => msg.senderId === chat.userId && msg.type === 'FREE_TEXT'
      )

      if (!hasOwnerReplied && !senderId) {
        // Reader trying to send free text before owner replied
        return NextResponse.json(
          {
            error:
              'You can only send free-text messages after the owner replies',
          },
          { status: 400 }
        )
      }
    }

    // Create message
    const message = await prisma.message.create({
      data: {
        chatId: params.chatId,
        senderId,
        content,
        type,
      },
    })

    // If owner sends a free-text message, activate the chat
    if (senderId === chat.userId && type === 'FREE_TEXT' && chat.status === 'PENDING') {
      await prisma.chat.update({
        where: { id: params.chatId },
        data: {
          status: 'ACTIVE',
          expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000), // 24 hours from now
        },
      })
    }

    // Send email notification if this is the first message from a reader
    if (
      !senderId &&
      chat.messages.length === 0 &&
      type === 'PREDEFINED'
    ) {
      try {
        const chatUrl = `${process.env.NEXTAUTH_URL}/chat/${params.chatId}`
        const emailHtml = getNewChatEmailTemplate(
          'en', // You can detect locale later
          chat.qrCode.user.name || 'Owner',
          chat.qrCode.name,
          chatUrl,
          content
        )

        await sendEmail({
          to: chat.qrCode.user.email,
          subject: `New message about your ${chat.qrCode.name}`,
          html: emailHtml,
        })
      } catch (emailError) {
        console.error('Error sending email:', emailError)
        // Don't fail the request if email fails
      }
    }

    return NextResponse.json(message)
  } catch (error) {
    console.error('Error creating message:', error)
    return NextResponse.json(
      { error: 'Failed to create message' },
      { status: 500 }
    )
  }
}

