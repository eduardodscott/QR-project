import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/db'

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.id || session.user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const qrCode = await prisma.qRCode.findUnique({
      where: { id: params.id },
    })

    if (!qrCode) {
      return NextResponse.json({ error: 'QR code not found' }, { status: 404 })
    }

    // Delete QR code (cascades to chats and messages)
    await prisma.qRCode.delete({
      where: { id: params.id },
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting QR code:', error)
    return NextResponse.json(
      { error: 'Failed to delete QR code' },
      { status: 500 }
    )
  }
}

