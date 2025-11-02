import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/db'

export async function GET(request: Request) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.id || session.user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const status = searchParams.get('status') as 'ACTIVE' | 'ARCHIVED' | undefined

    const where: any = {}
    if (status) {
      where.status = status
    }

    const qrCodes = await prisma.qRCode.findMany({
      where,
      include: {
        user: {
          select: {
            id: true,
            email: true,
            name: true,
          },
        },
        _count: {
          select: {
            chats: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    })

    const qrCodesWithUrls = qrCodes.map((qr) => ({
      ...qr,
      qrUrl: `${process.env.NEXTAUTH_URL}/qr/${qr.code}`,
    }))

    return NextResponse.json(qrCodesWithUrls)
  } catch (error) {
    console.error('Error fetching QR codes:', error)
    return NextResponse.json(
      { error: 'Failed to fetch QR codes' },
      { status: 500 }
    )
  }
}

