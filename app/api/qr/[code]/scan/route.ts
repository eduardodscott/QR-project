import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

export async function GET(
  request: Request,
  { params }: { params: { code: string } }
) {
  try {
    const qrCode = await prisma.qRCode.findUnique({
      where: { code: params.code },
      include: {
        user: {
          select: {
            name: true,
            email: true,
          },
        },
      },
    })

    if (!qrCode) {
      return NextResponse.json({ error: 'QR code not found' }, { status: 404 })
    }

    if (qrCode.status !== 'ACTIVE') {
      return NextResponse.json(
        { error: 'QR code is not active' },
        { status: 400 }
      )
    }

    // Create or get existing chat
    let chat = await prisma.chat.findFirst({
      where: {
        qrCodeId: qrCode.id,
        status: {
          in: ['PENDING', 'ACTIVE'],
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    })

    if (!chat) {
      // Create new chat for this reader
      chat = await prisma.chat.create({
        data: {
          qrCodeId: qrCode.id,
          userId: qrCode.userId,
          status: 'PENDING',
          expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000), // 24 hours from now
        },
      })
    }

    return NextResponse.json({
      qrCode: {
        id: qrCode.id,
        name: qrCode.name,
        message: qrCode.message,
        code: qrCode.code,
      },
      chat: {
        id: chat.id,
        status: chat.status,
        expiresAt: chat.expiresAt,
      },
      owner: {
        name: qrCode.user.name,
      },
    })
  } catch (error) {
    console.error('Error scanning QR code:', error)
    return NextResponse.json(
      { error: 'Failed to scan QR code' },
      { status: 500 }
    )
  }
}

