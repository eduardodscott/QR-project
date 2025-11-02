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
    
    if (!session?.user?.id || session.user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const { status } = body

    if (!status || !['ACTIVE', 'ARCHIVED'].includes(status)) {
      return NextResponse.json(
        { error: 'Invalid status' },
        { status: 400 }
      )
    }

    const updated = await prisma.qRCode.update({
      where: { id: params.id },
      data: { status },
    })

    return NextResponse.json(updated)
  } catch (error) {
    console.error('Error updating QR code status:', error)
    return NextResponse.json(
      { error: 'Failed to update QR code status' },
      { status: 500 }
    )
  }
}

