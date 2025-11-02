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
    const status = searchParams.get('status') as 'ACTIVE' | 'ARCHIVED' | undefined

    const where: any = {
      userId: session.user.id,
    }

    if (status) {
      where.status = status
    }

    const qrCodes = await prisma.qRCode.findMany({
      where,
      orderBy: {
        createdAt: 'desc',
      },
      include: {
        _count: {
          select: {
            chats: true,
          },
        },
        chats: {
          where: {
            status: {
              in: ['PENDING', 'ACTIVE'],
            },
          },
          include: {
            messages: {
              where: {
                senderId: {
                  not: session.user.id,
                },
                createdAt: {
                  gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), // Last 7 days
                },
              },
              orderBy: {
                createdAt: 'desc',
              },
              take: 1,
            },
          },
        },
      },
    })

    // Add QR URLs and unread message info
    const qrCodesWithUrls = qrCodes.map((qr) => {
      // Check if there are any chats with unread messages (messages from non-owner)
      const hasUnread = qr.chats.some(
        (chat) =>
          chat.messages.length > 0 &&
          chat.status !== 'EXPIRED' &&
          new Date(chat.expiresAt) > new Date()
      )

      return {
        ...qr,
        qrUrl: `${process.env.NEXTAUTH_URL}/qr/${qr.code}`,
        hasUnreadMessage: hasUnread,
      }
    })

    return NextResponse.json(qrCodesWithUrls)
  } catch (error) {
    console.error('Error fetching QR codes:', error)
    return NextResponse.json(
      { error: 'Failed to fetch QR codes' },
      { status: 500 }
    )
  }
}

