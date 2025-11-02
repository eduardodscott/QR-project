import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/db'
import { generateUniqueCode } from '@/lib/utils'
import QRCodeGenerator from 'qrcode'

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const { name, message } = body

    if (!name || !message) {
      return NextResponse.json(
        { error: 'Name and message are required' },
        { status: 400 }
      )
    }

    // Check if user has less than 10 active QR codes
    const activeQRCount = await prisma.qRCode.count({
      where: {
        userId: session.user.id,
        status: 'ACTIVE',
      },
    })

    if (activeQRCount >= 10) {
      return NextResponse.json(
        { error: 'Maximum of 10 active QR codes allowed' },
        { status: 400 }
      )
    }

    // Generate unique code
    const code = generateUniqueCode()
    const qrUrl = `${process.env.NEXTAUTH_URL}/qr/${code}`

    // Generate QR code image
    const qrImageDataUrl = await QRCodeGenerator.toDataURL(qrUrl, {
      width: 300,
      margin: 2,
    })

    // Create QR code in database
    const qrCode = await prisma.qRCode.create({
      data: {
        userId: session.user.id,
        code,
        name,
        message,
        status: 'ACTIVE',
      },
    })

    return NextResponse.json({
      ...qrCode,
      qrImage: qrImageDataUrl,
      qrUrl,
    })
  } catch (error) {
    console.error('Error creating QR code:', error)
    return NextResponse.json(
      { error: 'Failed to create QR code' },
      { status: 500 }
    )
  }
}

