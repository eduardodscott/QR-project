'use client'

import { useState, useEffect, useRef } from 'react'

interface Message {
  id: string
  content: string
  type: 'PREDEFINED' | 'FREE_TEXT'
  createdAt: string
  senderId: string | null
}

interface ChatInterfaceProps {
  chatId: string
  messages: Message[]
  chatStatus: 'PENDING' | 'ACTIVE' | 'EXPIRED'
  hasOwnerReplied: boolean
  isExpired: boolean
  predefinedMessages: string[]
  onSendPredefined: (message: string) => void
  onSendFreeText: (message: string) => void
  onRefresh: () => void
}

export default function ChatInterface({
  messages,
  hasOwnerReplied,
  isExpired,
  predefinedMessages,
  onSendPredefined,
  onSendFreeText,
  onRefresh,
}: ChatInterfaceProps) {
  const [message, setMessage] = useState('')
  const [sending, setSending] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const handleSendMessage = async () => {
    if (!message.trim() || sending || isExpired) return

    setSending(true)
    await onSendFreeText(message)
    setMessage('')
    setSending(false)
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

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200">
      {/* Messages */}
      <div className="p-4 space-y-4 max-h-96 overflow-y-auto">
        {messages.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            No messages yet. Send a message below to start the conversation!
          </div>
        ) : (
          messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex ${
                msg.senderId ? 'justify-end' : 'justify-start'
              }`}
            >
              <div
                className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                  msg.senderId
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-900'
                }`}
              >
                <p className="text-sm whitespace-pre-wrap">{msg.content}</p>
                <p
                  className={`text-xs mt-1 ${
                    msg.senderId ? 'text-blue-100' : 'text-gray-500'
                  }`}
                >
                  {formatDate(msg.createdAt)}
                </p>
              </div>
            </div>
          ))
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Predefined Messages */}
      {!hasOwnerReplied && messages.length === 0 && !isExpired && (
        <div className="border-t border-gray-200 p-4 bg-gray-50">
          <p className="text-sm font-medium text-gray-700 mb-3">
            Choose a message to send:
          </p>
          <div className="space-y-2">
            {predefinedMessages.map((msg, index) => (
              <button
                key={index}
                onClick={() => onSendPredefined(msg)}
                className="w-full text-left px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 hover:border-blue-500 transition-colors text-sm"
              >
                {msg}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Free Text Input */}
      {hasOwnerReplied && !isExpired && (
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
              disabled={sending || isExpired}
            />
            <button
              onClick={handleSendMessage}
              disabled={!message.trim() || sending || isExpired}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {sending ? 'Sending...' : 'Send'}
            </button>
          </div>
          <div className="flex justify-between items-center mt-2">
            <p className="text-xs text-gray-500">
              {message.length}/200 characters
            </p>
            <button
              onClick={onRefresh}
              className="text-xs text-blue-600 hover:text-blue-800"
            >
              Refresh
            </button>
          </div>
        </div>
      )}

      {/* Read-only Message */}
      {isExpired && (
        <div className="border-t border-gray-200 p-4 bg-gray-50 text-center">
          <p className="text-sm text-gray-600">
            This chat has expired. You can view messages but cannot send new ones.
          </p>
        </div>
      )}

      {/* Waiting for owner reply */}
      {!hasOwnerReplied && messages.length > 0 && !isExpired && (
        <div className="border-t border-gray-200 p-4 bg-yellow-50 text-center">
          <p className="text-sm text-yellow-800">
            Waiting for the owner to reply. Once they reply, you'll be able to send free-text messages.
          </p>
        </div>
      )}
    </div>
  )
}

