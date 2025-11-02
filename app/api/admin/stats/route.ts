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

    const [
      totalUsers,
      totalQRCodes,
      totalChats,
      activeChats,
      activeQRCodes,
      archivedQRCodes,
      expiredChats,
      recentUsers,
    ] = await Promise.all([
      prisma.user.count(),
      prisma.qRCode.count(),
      prisma.chat.count(),
      prisma.chat.count({
        where: { status: 'ACTIVE' },
      }),
      prisma.qRCode.count({
        where: { status: 'ACTIVE' },
      }),
      prisma.qRCode.count({
        where: { status: 'ARCHIVED' },
      }),
      prisma.chat.count({
        where: { status: 'EXPIRED' },
      }),
      prisma.user.count({
        where: {
          createdAt: {
            gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), // Last 7 days
          },
        },
      }),
    ])

    return NextResponse.json({
      totalUsers,
      totalQRCodes,
      totalChats,
      activeChats,
      activeQRCodes,
      archivedQRCodes,
      expiredChats,
      recentUsers,
    })
  } catch (error) {
    console.error('Error fetching stats:', error)
    return NextResponse.json(
      { error: 'Failed to fetch stats' },
      { status: 500 }
    )
  }
}

