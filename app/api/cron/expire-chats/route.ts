import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { headers } from 'next/headers'

// This endpoint is called by Vercel Cron Jobs
// Protect it with a secret token
export async function GET(request: Request) {
  try {
    // Verify it's coming from Vercel Cron (check for authorization header)
    const headersList = headers()
    const authHeader = headersList.get('authorization')

    // In production, Vercel adds a secret token
    // For development, you can check for a specific header or secret
    if (process.env.CRON_SECRET) {
      if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
      }
    }

    const now = new Date()

    // Find all chats that should be expired
    // Chats expire when:
    // 1. They are ACTIVE or PENDING
    // 2. expiresAt is in the past
    const expiredChats = await prisma.chat.findMany({
      where: {
        status: {
          in: ['PENDING', 'ACTIVE'],
        },
        expiresAt: {
          lt: now,
        },
      },
      select: {
        id: true,
      },
    })

    if (expiredChats.length === 0) {
      return NextResponse.json({
        success: true,
        message: 'No chats to expire',
        expiredCount: 0,
      })
    }

    // Update all expired chats to EXPIRED status
    const result = await prisma.chat.updateMany({
      where: {
        id: {
          in: expiredChats.map((chat) => chat.id),
        },
      },
      data: {
        status: 'EXPIRED',
      },
    })

    return NextResponse.json({
      success: true,
      message: `Expired ${result.count} chat(s)`,
      expiredCount: result.count,
      timestamp: now.toISOString(),
    })
  } catch (error) {
    console.error('Error expiring chats:', error)
    return NextResponse.json(
      {
        error: 'Failed to expire chats',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    )
  }
}

