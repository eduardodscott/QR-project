import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/db'

export async function GET(request: Request) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const qrCodeId = searchParams.get('qrCodeId')

    if (!qrCodeId) {
      return NextResponse.json(
        { error: 'QR code ID is required' },
        { status: 400 }
      )
    }

    // Verify the QR code belongs to the user
    const qrCode = await prisma.qRCode.findUnique({
      where: { id: qrCodeId },
    })

    if (!qrCode) {
      return NextResponse.json({ error: 'QR code not found' }, { status: 404 })
    }

    if (qrCode.userId !== session.user.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 403 })
    }

    // Get all chats for this QR code
    const chats = await prisma.chat.findMany({
      where: {
        qrCodeId: qrCode.id,
      },
      include: {
        _count: {
          select: {
            messages: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    })

    // Format dates for JSON response
    const formattedChats = chats.map((chat) => ({
      id: chat.id,
      status: chat.status,
      createdAt: chat.createdAt.toISOString(),
      expiresAt: chat.expiresAt.toISOString(),
      _count: {
        messages: chat._count.messages,
      },
    }))

    return NextResponse.json(formattedChats)
  } catch (error) {
    console.error('Error fetching QR code chats:', error)
    return NextResponse.json(
      { error: 'Failed to fetch chats' },
      { status: 500 }
    )
  }
}

