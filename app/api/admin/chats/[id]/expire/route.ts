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

    const updated = await prisma.chat.update({
      where: { id: params.id },
      data: {
        status: 'EXPIRED',
      },
    })

    return NextResponse.json(updated)
  } catch (error) {
    console.error('Error expiring chat:', error)
    return NextResponse.json(
      { error: 'Failed to expire chat' },
      { status: 500 }
    )
  }
}

