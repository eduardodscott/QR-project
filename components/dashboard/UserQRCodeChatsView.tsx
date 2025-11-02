'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

interface Chat {
  id: string
  status: 'PENDING' | 'ACTIVE' | 'EXPIRED'
  createdAt: string
  expiresAt: string
  _count: {
    messages: number
  }
}

interface QRCodeInfo {
  id: string
  name: string
  code: string
  message: string
  status: 'ACTIVE' | 'ARCHIVED'
  qrUrl: string
}

interface UserQRCodeChatsViewProps {
  qrCodeId: string
  userId: string
}

export default function UserQRCodeChatsView({ qrCodeId, userId }: UserQRCodeChatsViewProps) {
  const [chats, setChats] = useState<Chat[]>([])
  const [qrCode, setQRCode] = useState<QRCodeInfo | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchData()
  }, [qrCodeId])

  const fetchData = async () => {
    setLoading(true)
    try {
      // Fetch chats for this QR code
      const chatsResponse = await fetch(`/api/qr/chats?qrCodeId=${qrCodeId}`)
      if (chatsResponse.ok) {
        const chatsData = await chatsResponse.json()
        console.log('Fetched chats:', chatsData) // Debug log
        setChats(chatsData)
      } else {
        const errorData = await chatsResponse.json()
        console.error('Error fetching chats:', errorData)
      }

      // Fetch QR code details separately
      const qrResponse = await fetch(`/api/qr/list`)
      if (qrResponse.ok) {
        const qrData = await qrResponse.json()
        const qr = qrData.find((q: QRCodeInfo) => q.id === qrCodeId)
        if (qr) {
          setQRCode(qr)
        }
      }
    } catch (error) {
      console.error('Error fetching data:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mb-4"></div>
          <p className="text-gray-600">Loading chats...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div>
              <Link href="/dashboard" className="text-blue-600 hover:text-blue-800 text-sm mb-2 inline-block">
                ← Back to Dashboard
              </Link>
              <h1 className="text-2xl font-bold text-gray-900">
                Chats for QR Code
              </h1>
              {qrCode && (
                <div className="mt-2">
                  <p className="text-sm text-gray-600">
                    <strong>Name:</strong> {qrCode.name}
                  </p>
                  <p className="text-sm text-gray-600">
                    <strong>Code:</strong> {qrCode.code}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {chats.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-lg border border-gray-200">
            <p className="text-gray-500 mb-4">No chats found for this QR code</p>
            <p className="text-sm text-gray-400">
              When someone scans this QR code and sends a message, chats will appear here.
            </p>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Messages
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Created
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Expires
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {chats.map((chat) => (
                  <tr key={chat.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 py-1 text-xs rounded ${
                          chat.status === 'ACTIVE'
                            ? 'bg-green-100 text-green-800'
                            : chat.status === 'EXPIRED'
                            ? 'bg-gray-100 text-gray-800'
                            : 'bg-yellow-100 text-yellow-800'
                        }`}
                      >
                        {chat.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {chat._count.messages} message{chat._count.messages !== 1 ? 's' : ''}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(chat.createdAt).toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(chat.expiresAt).toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <a
                        href={`/chat/${chat.id}`}
                        className="px-3 py-1 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100"
                      >
                        View Chat
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </main>
    </div>
  )
}

