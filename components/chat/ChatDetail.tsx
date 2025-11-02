'use client'

import { useState, useEffect, useRef } from 'react'
import { useSession } from 'next-auth/react'
import Link from 'next/link'

interface Message {
  id: string
  content: string
  type: 'PREDEFINED' | 'FREE_TEXT'
  createdAt: string
  senderId: string | null
}

interface Chat {
  id: string
  status: 'PENDING' | 'ACTIVE' | 'EXPIRED'
  expiresAt: string
  qrCode: {
    name: string
    code: string
  }
  messages: Message[]
}

interface ChatDetailProps {
  chatId: string
}

export default function ChatDetail({ chatId }: ChatDetailProps) {
  const { data: session } = useSession()
  const [chat, setChat] = useState<Chat | null>(null)
  const [loading, setLoading] = useState(true)
  const [message, setMessage] = useState('')
  const [sending, setSending] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    fetchChat()
    // Poll for new messages every 5 seconds
    const interval = setInterval(fetchChat, 5000)
    return () => clearInterval(interval)
  }, [chatId])

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [chat?.messages])

  const fetchChat = async () => {
    try {
      const response = await fetch(`/api/chat/${chatId}`)
      if (response.ok) {
        const data = await response.json()
        setChat(data)
      }
    } catch (error) {
      console.error('Error fetching chat:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSendMessage = async () => {
    if (!message.trim() || sending) return
    if (message.length > 200) {
      alert('Message must be 200 characters or less')
      return
    }

    setSending(true)
    try {
      const response = await fetch(`/api/chat/${chatId}/message`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          content: message,
          type: 'FREE_TEXT',
        }),
      })

      if (response.ok) {
        setMessage('')
        fetchChat()
      } else {
        const data = await response.json()
        alert(data.error || 'Failed to send message')
      }
    } catch (error) {
      console.error('Error sending message:', error)
      alert('Failed to send message')
    } finally {
      setSending(false)
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(date)
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mb-4"></div>
          <p className="text-gray-600">Loading chat...</p>
        </div>
      </div>
    )
  }

  if (!chat) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Chat Not Found</h1>
          <p className="text-gray-600 mb-4">This chat does not exist or you don't have access to it.</p>
          <Link href="/dashboard" className="text-blue-600 hover:text-blue-800">
            Back to Dashboard
          </Link>
        </div>
      </div>
    )
  }

  const isExpired = chat.status === 'EXPIRED' || new Date(chat.expiresAt) < new Date()
  const hasOwnerReplied = chat.messages.some(
    (msg) => msg.senderId === session?.user?.id && msg.type === 'FREE_TEXT'
  )

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div>
              <Link href="/dashboard" className="text-blue-600 hover:text-blue-800 text-sm mb-2 inline-block">
                ← Back to Dashboard
              </Link>
              <h1 className="text-2xl font-bold text-gray-900">
                Chat: {chat.qrCode?.name || 'Unknown Item'}
              </h1>
              <p className="text-sm text-gray-500 mt-1">
                QR Code: {chat.qrCode?.code || 'Unknown'}
              </p>
            </div>
            <span
              className={`px-3 py-1 text-sm rounded-full ${
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
        </div>
      </header>

      {/* Chat Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {isExpired && (
          <div className="mb-6 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <p className="text-yellow-800 text-sm">
              ⚠️ This chat has expired and is read-only.
            </p>
          </div>
        )}

        {/* Messages */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-6">
          <div className="p-4 space-y-4 max-h-96 overflow-y-auto">
            {chat.messages.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                No messages yet. The finder will send a message to start the conversation.
              </div>
            ) : (
              chat.messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${
                    msg.senderId === session?.user?.id
                      ? 'justify-end'
                      : 'justify-start'
                  }`}
                >
                  <div
                    className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                      msg.senderId === session?.user?.id
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-100 text-gray-900'
                    }`}
                  >
                    <p className="text-sm whitespace-pre-wrap">{msg.content}</p>
                    <p
                      className={`text-xs mt-1 ${
                        msg.senderId === session?.user?.id
                          ? 'text-blue-100'
                          : 'text-gray-500'
                      }`}
                    >
                      {formatDate(msg.createdAt)}
                      {msg.type === 'PREDEFINED' && ' • Predefined'}
                    </p>
                  </div>
                </div>
              ))
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Message Input */}
          {!isExpired && (
            <div className="border-t border-gray-200 p-4">
              <div className="flex gap-2">
                <textarea
                  value={message}
                  onChange={(e) => {
                    const text = e.target.value
                    if (text.length <= 200) {
                      setMessage(text)
                    }
                  }}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault()
                      handleSendMessage()
                    }
                  }}
                  placeholder="Type your message (max 200 characters)..."
                  rows={2}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                  disabled={sending}
                />
                <button
                  onClick={handleSendMessage}
                  disabled={!message.trim() || sending}
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {sending ? 'Sending...' : 'Send'}
                </button>
              </div>
              <div className="flex justify-between items-center mt-2">
                <p className="text-xs text-gray-500">
                  {message.length}/200 characters
                </p>
                <button
                  onClick={fetchChat}
                  className="text-xs text-blue-600 hover:text-blue-800"
                >
                  Refresh
                </button>
              </div>
            </div>
          )}

          {/* Expired Message */}
          {isExpired && (
            <div className="border-t border-gray-200 p-4 bg-gray-50 text-center">
              <p className="text-sm text-gray-600">
                This chat has expired. You can view messages but cannot send new ones.
              </p>
            </div>
          )}
        </div>

        {/* Info Card */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h3 className="font-semibold text-blue-900 mb-2">About this chat</h3>
          <ul className="text-sm text-blue-800 space-y-1">
            <li>• This chat expires 24 hours after your first reply</li>
            <li>• Messages are limited to 200 characters</li>
            <li>• The finder can only send predefined messages until you reply</li>
            <li>
              • Once you reply, both you and the finder can send free-text messages
            </li>
          </ul>
        </div>
      </main>
    </div>
  )
}

