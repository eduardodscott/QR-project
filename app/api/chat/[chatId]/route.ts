import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

export async function GET(
  request: Request,
  { params }: { params: { chatId: string } }
) {
  try {
    const chat = await prisma.chat.findUnique({
      where: { id: params.chatId },
      include: {
        qrCode: {
          select: {
            name: true,
            code: true,
          },
        },
        messages: {
          orderBy: {
            createdAt: 'asc',
          },
        },
      },
    })

    if (!chat) {
      return NextResponse.json({ error: 'Chat not found' }, { status: 404 })
    }

    return NextResponse.json(chat)
  } catch (error) {
    console.error('Error fetching chat:', error)
    return NextResponse.json(
      { error: 'Failed to fetch chat' },
      { status: 500 }
    )
  }
}

