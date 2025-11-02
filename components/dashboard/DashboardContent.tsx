'use client'

import { useState, useEffect } from 'react'
import { signOut } from 'next-auth/react'
import CreateQRCodeModal from './CreateQRCodeModal'
import QRCodeList from './QRCodeList'
import ChatList from './ChatList'

interface User {
  id: string
  email: string
  name?: string | null
  role?: string
}

interface DashboardContentProps {
  user: User
}

export default function DashboardContent({ user }: DashboardContentProps) {
  const [activeTab, setActiveTab] = useState<'qr' | 'chats'>('qr')
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [refreshKey, setRefreshKey] = useState(0)

  const handleQRCreated = () => {
    setShowCreateModal(false)
    setRefreshKey((prev) => prev + 1)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">QR-Chat Platform</h1>
              <p className="text-sm text-gray-500">
                Welcome, {user.name || user.email}
                {user.role === 'ADMIN' && (
                  <span className="ml-2 px-2 py-1 bg-purple-100 text-purple-800 text-xs rounded">
                    Admin
                  </span>
                )}
              </p>
            </div>
            <div className="flex gap-3 items-center">
              {user.role === 'ADMIN' && (
                <a
                  href="/admin"
                  className="px-4 py-2 text-sm bg-purple-600 text-white rounded-lg hover:bg-purple-700"
                >
                  Admin Dashboard
                </a>
              )}
              <button
                onClick={() => signOut({ callbackUrl: '/' })}
                className="px-4 py-2 text-sm text-gray-700 hover:text-gray-900"
              >
                Sign Out
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Tabs */}
        <div className="mb-6 border-b border-gray-200">
          <nav className="flex space-x-8">
            <button
              onClick={() => setActiveTab('qr')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'qr'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              My QR Codes
            </button>
            <button
              onClick={() => setActiveTab('chats')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'chats'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Chats
            </button>
          </nav>
        </div>

        {/* QR Codes Tab */}
        {activeTab === 'qr' && (
          <div>
            <div className="mb-6 flex justify-between items-center">
              <h2 className="text-xl font-semibold text-gray-900">Your QR Codes</h2>
              <button
                onClick={() => setShowCreateModal(true)}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                + Create New QR Code
              </button>
            </div>
            <QRCodeList key={refreshKey} />
          </div>
        )}

        {/* Chats Tab */}
        {activeTab === 'chats' && (
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Your Chats</h2>
            <ChatList />
          </div>
        )}
      </main>

      {/* Create QR Code Modal */}
      {showCreateModal && (
        <CreateQRCodeModal
          onClose={() => setShowCreateModal(false)}
          onSuccess={handleQRCreated}
        />
      )}
    </div>
  )
}

