'use client'

import { useParams } from 'next/navigation'
import ChatDetail from '@/components/chat/ChatDetail'

export default function ChatPage() {
  const params = useParams()
  const chatId = params.chatId as string

  if (!chatId) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Chat ID Required</h1>
          <p className="text-gray-600">Please provide a valid chat ID.</p>
        </div>
      </div>
    )
  }

  return <ChatDetail chatId={chatId} />
}

