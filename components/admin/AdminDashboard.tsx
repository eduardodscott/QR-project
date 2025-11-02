'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import AdminStats from './AdminStats'
import AdminUsers from './AdminUsers'
import AdminQRCodes from './AdminQRCodes'
import AdminChats from './AdminChats'

interface User {
  id: string
  email: string
  name?: string | null
  role?: string
}

interface AdminDashboardProps {
  user: User
}

export default function AdminDashboard({ user }: AdminDashboardProps) {
  const [activeTab, setActiveTab] = useState<'stats' | 'users' | 'qr' | 'chats'>('stats')

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
              <p className="text-sm text-gray-500">
                Welcome, {user.name || user.email}
                <span className="ml-2 px-2 py-1 bg-purple-100 text-purple-800 text-xs rounded">
                  Admin
                </span>
              </p>
            </div>
            <a
              href="/dashboard"
              className="px-4 py-2 text-sm text-gray-700 hover:text-gray-900"
            >
              ← Back to Dashboard
            </a>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Tabs */}
        <div className="mb-6 border-b border-gray-200">
          <nav className="flex space-x-8">
            <button
              onClick={() => setActiveTab('stats')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'stats'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Statistics
            </button>
            <button
              onClick={() => setActiveTab('users')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'users'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Users
            </button>
            <button
              onClick={() => setActiveTab('qr')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'qr'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              QR Codes
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

        {/* Tab Content */}
        {activeTab === 'stats' && <AdminStats />}
        {activeTab === 'users' && <AdminUsers />}
        {activeTab === 'qr' && <AdminQRCodes />}
        {activeTab === 'chats' && <AdminChats />}
      </main>
    </div>
  )
}

