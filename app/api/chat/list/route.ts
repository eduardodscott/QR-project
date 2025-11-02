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

    const chats = await prisma.chat.findMany({
      where: {
        userId: session.user.id,
      },
      include: {
        qrCode: {
          select: {
            name: true,
            code: true,
          },
        },
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

    // Add unread status
    const chatsWithUnread = chats.map((chat) => ({
      ...chat,
      hasUnreadMessage:
        chat.messages.length > 0 &&
        chat.status !== 'EXPIRED' &&
        new Date(chat.expiresAt) > new Date(),
    }))

    return NextResponse.json(chatsWithUnread)
  } catch (error) {
    console.error('Error fetching chats:', error)
    return NextResponse.json(
      { error: 'Failed to fetch chats' },
      { status: 500 }
    )
  }
}

