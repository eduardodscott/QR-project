'use client'

import { useState, useEffect } from 'react'

interface Chat {
  id: string
  status: 'PENDING' | 'ACTIVE' | 'EXPIRED'
  createdAt: string
  expiresAt: string
  user: {
    id: string
    email: string
    name: string | null
  }
  qrCode: {
    name: string
    code: string
  }
  _count: {
    messages: number
  }
}

export default function AdminChats() {
  const [chats, setChats] = useState<Chat[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState<'all' | 'PENDING' | 'ACTIVE' | 'EXPIRED'>('all')

  useEffect(() => {
    fetchChats()
  }, [filter])

  const fetchChats = async () => {
    setLoading(true)
    try {
      const url =
        filter === 'all'
          ? '/api/admin/chats'
          : `/api/admin/chats?status=${filter}`
      const response = await fetch(url)
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

  const handleExpire = async (chatId: string) => {
    if (!confirm('Are you sure you want to expire this chat?')) {
      return
    }

    try {
      const response = await fetch(`/api/admin/chats/${chatId}/expire`, {
        method: 'PUT',
      })

      if (response.ok) {
        fetchChats()
      } else {
        alert('Failed to expire chat')
      }
    } catch (error) {
      console.error('Error expiring chat:', error)
      alert('Failed to expire chat')
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

  return (
    <div>
      <div className="mb-6 flex justify-between items-center">
        <h2 className="text-xl font-semibold text-gray-900">All Chats</h2>
        <div className="flex gap-2">
          <button
            onClick={() => setFilter('all')}
            className={`px-4 py-2 rounded-lg text-sm ${
              filter === 'all'
                ? 'bg-blue-600 text-white'
                : 'bg-white text-gray-700 hover:bg-gray-50'
            }`}
          >
            All
          </button>
          <button
            onClick={() => setFilter('PENDING')}
            className={`px-4 py-2 rounded-lg text-sm ${
              filter === 'PENDING'
                ? 'bg-blue-600 text-white'
                : 'bg-white text-gray-700 hover:bg-gray-50'
            }`}
          >
            Pending
          </button>
          <button
            onClick={() => setFilter('ACTIVE')}
            className={`px-4 py-2 rounded-lg text-sm ${
              filter === 'ACTIVE'
                ? 'bg-blue-600 text-white'
                : 'bg-white text-gray-700 hover:bg-gray-50'
            }`}
          >
            Active
          </button>
          <button
            onClick={() => setFilter('EXPIRED')}
            className={`px-4 py-2 rounded-lg text-sm ${
              filter === 'EXPIRED'
                ? 'bg-blue-600 text-white'
                : 'bg-white text-gray-700 hover:bg-gray-50'
            }`}
          >
            Expired
          </button>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                QR Code
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Owner
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Messages
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
                  <div>
                    <div className="text-sm font-medium text-gray-900">{chat.qrCode.name}</div>
                    <div className="text-sm text-gray-500">{chat.qrCode.code}</div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div>
                    <div className="text-sm text-gray-900">{chat.user.name || 'No name'}</div>
                    <div className="text-sm text-gray-500">{chat.user.email}</div>
                  </div>
                </td>
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
                  {chat._count.messages}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {new Date(chat.expiresAt).toLocaleString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  {chat.status !== 'EXPIRED' && (
                    <button
                      onClick={() => handleExpire(chat.id)}
                      className="px-3 py-1 bg-red-50 text-red-700 rounded-lg hover:bg-red-100 text-sm"
                    >
                      Expire
                    </button>
                  )}
                  <a
                    href={`/chat/${chat.id}`}
                    className="ml-2 px-3 py-1 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 text-sm"
                  >
                    View
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

