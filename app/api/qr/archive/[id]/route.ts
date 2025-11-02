import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/db'

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const qrCode = await prisma.qRCode.findUnique({
      where: { id: params.id },
    })

    if (!qrCode || qrCode.userId !== session.user.id) {
      return NextResponse.json({ error: 'QR code not found' }, { status: 404 })
    }

    const updated = await prisma.qRCode.update({
      where: { id: params.id },
      data: {
        status: qrCode.status === 'ACTIVE' ? 'ARCHIVED' : 'ACTIVE',
      },
    })

    return NextResponse.json(updated)
  } catch (error) {
    console.error('Error updating QR code:', error)
    return NextResponse.json(
      { error: 'Failed to update QR code' },
      { status: 500 }
    )
  }
}

