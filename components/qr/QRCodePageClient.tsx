'use client'

import { useState, useEffect } from 'react'
import ChatInterface from './ChatInterface'

interface QRCodePageClientProps {
  initialData: {
    qrCode: {
      id: string
      name: string
      message: string
      code: string
    }
    chat: {
      id: string
      status: 'PENDING' | 'ACTIVE' | 'EXPIRED'
      expiresAt: string
    }
    owner: {
      name: string | null
    }
  }
}

const PREDEFINED_MESSAGES = [
  'I found your item! How can I return it to you?',
  'Hello! I found this item. Please contact me.',
  'I found your item and would like to return it. What is the best way to reach you?',
]

export default function QRCodePageClient({ initialData }: QRCodePageClientProps) {
  const [chatData, setChatData] = useState(initialData.chat)
  const [messages, setMessages] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchMessages()
  }, [initialData.chat.id])

  const fetchMessages = async () => {
    try {
      const response = await fetch(`/api/chat/${initialData.chat.id}`)
      if (response.ok) {
        const data = await response.json()
        setMessages(data.messages || [])
        if (data.chat) {
          setChatData(data.chat)
        }
      }
    } catch (error) {
      console.error('Error fetching messages:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSendPredefinedMessage = async (messageText: string) => {
    try {
      const response = await fetch(`/api/chat/${initialData.chat.id}/message`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          content: messageText,
          type: 'PREDEFINED',
        }),
      })

      if (response.ok) {
        fetchMessages()
        // Refresh chat data to get updated status
        const chatResponse = await fetch(`/api/qr/${initialData.qrCode.code}/scan`)
        if (chatResponse.ok) {
          const chatData = await chatResponse.json()
          setChatData(chatData.chat)
        }
      }
    } catch (error) {
      console.error('Error sending message:', error)
      alert('Failed to send message. Please try again.')
    }
  }

  const handleSendFreeText = async (messageText: string) => {
    if (messageText.length > 200) {
      alert('Message must be 200 characters or less')
      return
    }

    if (messageText.trim().length === 0) {
      return
    }

    try {
      const response = await fetch(`/api/chat/${initialData.chat.id}/message`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          content: messageText,
          type: 'FREE_TEXT',
        }),
      })

      if (response.ok) {
        fetchMessages()
      } else {
        const data = await response.json()
        alert(data.error || 'Failed to send message')
      }
    } catch (error) {
      console.error('Error sending message:', error)
      alert('Failed to send message. Please try again.')
    }
  }

  const hasOwnerReplied = messages.some((msg) => msg.senderId !== null && msg.type === 'FREE_TEXT')
  const isExpired = chatData.status === 'EXPIRED' || new Date(chatData.expiresAt) < new Date()

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-2xl mx-auto px-4">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            {initialData.qrCode.name}
          </h1>
          <p className="text-gray-600 whitespace-pre-line">
            {initialData.qrCode.message}
          </p>
          {initialData.owner.name && (
            <p className="text-sm text-gray-500 mt-2">
              Owner: {initialData.owner.name}
            </p>
          )}
        </div>

        {/* Status Badge */}
        {isExpired && (
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
            <p className="text-yellow-800">
              ⚠️ This chat has expired and is read-only.
            </p>
          </div>
        )}

        {/* Chat Interface */}
        <ChatInterface
          chatId={initialData.chat.id}
          messages={messages}
          chatStatus={chatData.status}
          hasOwnerReplied={hasOwnerReplied}
          isExpired={isExpired}
          predefinedMessages={PREDEFINED_MESSAGES}
          onSendPredefined={handleSendPredefinedMessage}
          onSendFreeText={handleSendFreeText}
          onRefresh={fetchMessages}
        />
      </div>
    </div>
  )
}

