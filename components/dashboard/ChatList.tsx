'use client'

import { useState, useEffect } from 'react'

interface Chat {
  id: string
  qrCode: {
    name: string
    code: string
  }
  status: 'PENDING' | 'ACTIVE' | 'EXPIRED'
  createdAt: string
  hasUnreadMessage?: boolean
  _count: {
    messages: number
  }
}

export default function ChatList() {
  const [chats, setChats] = useState<Chat[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchChats()
  }, [])

  const fetchChats = async () => {
    setLoading(true)
    try {
      const response = await fetch('/api/chat/list')
      if (response.ok) {
        const data = await response.json()
        setChats(data)
      }
    } catch (error) {
      console.error('Error fetching chats:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="text-center py-12">
        <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        <p className="mt-4 text-gray-500">Loading chats...</p>
      </div>
    )
  }

  if (chats.length === 0) {
    return (
      <div className="text-center py-12 bg-white rounded-lg border border-gray-200">
        <p className="text-gray-500 mb-4">No chats yet</p>
        <p className="text-sm text-gray-400">
          When someone scans your QR code and sends a message, it will appear here.
        </p>
      </div>
    )
  }

  // Separate chats with unread messages
  const unreadChats = chats.filter((chat) => chat.hasUnreadMessage)
  const readChats = chats.filter((chat) => !chat.hasUnreadMessage)

  return (
    <div className="space-y-6">
      {/* Inbox Section - New Messages */}
      {unreadChats.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <span className="inline-block w-2 h-2 bg-green-500 rounded-full"></span>
            Inbox - New Messages
          </h3>
          <div className="space-y-4">
            {unreadChats.map((chat) => (
              <div
                key={chat.id}
                className="bg-green-50 rounded-lg border-2 border-green-300 p-4 hover:shadow-md transition-shadow"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold text-gray-900">
                        {chat.qrCode.name}
                      </h3>
                      <span className="px-2 py-0.5 text-xs font-medium bg-green-500 text-white rounded-full">
                        New Message
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mt-1">
                      {chat._count.messages} message{chat._count.messages !== 1 ? 's' : ''}
                    </p>
                    <span
                      className={`inline-block mt-2 px-2 py-1 text-xs rounded ${
                        chat.status === 'ACTIVE'
                          ? 'bg-green-100 text-green-800'
                          : chat.status === 'EXPIRED'
                          ? 'bg-gray-100 text-gray-800'
                          : 'bg-yellow-100 text-yellow-800'
                      }`}
                    >
                      {chat.status}
                    </span>
                  </div>
                  <a
                    href={`/chat/${chat.id}`}
                    className="px-4 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                  >
                    View Chat
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* All Chats Section */}
      {readChats.length > 0 && (
        <div>
          {unreadChats.length > 0 && (
            <h3 className="text-lg font-semibold text-gray-900 mb-4">All Chats</h3>
          )}
          <div className="space-y-4">
            {readChats.map((chat) => (
              <div
                key={chat.id}
                className="bg-white rounded-lg border border-gray-200 p-4 hover:shadow-md transition-shadow"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold text-gray-900">
                      {chat.qrCode.name}
                    </h3>
                    <p className="text-sm text-gray-500 mt-1">
                      {chat._count.messages} message{chat._count.messages !== 1 ? 's' : ''}
                    </p>
                    <span
                      className={`inline-block mt-2 px-2 py-1 text-xs rounded ${
                        chat.status === 'ACTIVE'
                          ? 'bg-green-100 text-green-800'
                          : chat.status === 'EXPIRED'
                          ? 'bg-gray-100 text-gray-800'
                          : 'bg-yellow-100 text-yellow-800'
                      }`}
                    >
                      {chat.status}
                    </span>
                  </div>
                  <a
                    href={`/chat/${chat.id}`}
                    className="px-4 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                  >
                    View Chat
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

