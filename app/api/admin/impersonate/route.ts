import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/db'

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.id || session.user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const { userId } = body

    if (!userId) {
      return NextResponse.json(
        { error: 'User ID is required' },
        { status: 400 }
      )
    }

    // Get the user to impersonate
    const targetUser = await prisma.user.findUnique({
      where: { id: userId },
    })

    if (!targetUser) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      )
    }

    // Return user data (in production, you might want to create a session token)
    return NextResponse.json({
      message: 'Impersonation initiated',
      user: {
        id: targetUser.id,
        email: targetUser.email,
        name: targetUser.name,
        role: targetUser.role,
      },
      note: 'In production, this would create a session token for the target user',
    })
  } catch (error) {
    console.error('Error impersonating user:', error)
    return NextResponse.json(
      { error: 'Failed to impersonate user' },
      { status: 500 }
    )
  }
}

