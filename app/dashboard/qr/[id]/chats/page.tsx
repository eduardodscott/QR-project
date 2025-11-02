'use client'

import { useParams } from 'next/navigation'
import { useSession } from 'next-auth/react'
import { redirect } from 'next/navigation'
import UserQRCodeChatsView from '@/components/dashboard/UserQRCodeChatsView'

export default function UserQRCodeChatsPage() {
  const params = useParams()
  const { data: session, status } = useSession()

  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    )
  }

  if (status === 'unauthenticated' || !session) {
    redirect('/auth/signin')
    return null
  }

  const qrCodeId = params.id as string

  if (!qrCodeId) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">QR Code ID Required</h1>
          <p className="text-gray-600">Please provide a valid QR code ID.</p>
        </div>
      </div>
    )
  }

  return <UserQRCodeChatsView qrCodeId={qrCodeId} userId={session.user.id} />
}

