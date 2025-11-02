'use client'

import { useState, useEffect } from 'react'

interface Stats {
  totalUsers: number
  totalQRCodes: number
  totalChats: number
  activeChats: number
  activeQRCodes: number
  archivedQRCodes: number
  expiredChats: number
  recentUsers: number
}

export default function AdminStats() {
  const [stats, setStats] = useState<Stats | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchStats()
  }, [])

  const fetchStats = async () => {
    try {
      const response = await fetch('/api/admin/stats')
      if (response.ok) {
        const data = await response.json()
        setStats(data)
      }
    } catch (error) {
      console.error('Error fetching stats:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="text-center py-12">
        <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        <p className="mt-4 text-gray-500">Loading statistics...</p>
      </div>
    )
  }

  if (!stats) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">Failed to load statistics</p>
      </div>
    )
  }

  const statCards = [
    {
      title: 'Total Users',
      value: stats.totalUsers,
      subtitle: `${stats.recentUsers} new in last 7 days`,
      color: 'blue',
    },
    {
      title: 'Total QR Codes',
      value: stats.totalQRCodes,
      subtitle: `${stats.activeQRCodes} active, ${stats.archivedQRCodes} archived`,
      color: 'green',
    },
    {
      title: 'Total Chats',
      value: stats.totalChats,
      subtitle: `${stats.activeChats} active, ${stats.expiredChats} expired`,
      color: 'purple',
    },
    {
      title: 'Active Chats',
      value: stats.activeChats,
      subtitle: 'Currently active conversations',
      color: 'yellow',
    },
  ]

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {statCards.map((stat, index) => (
          <div
            key={index}
            className="bg-white rounded-lg shadow-sm border border-gray-200 p-6"
          >
            <h3 className="text-sm font-medium text-gray-500 mb-2">{stat.title}</h3>
            <p className="text-3xl font-bold text-gray-900 mb-1">{stat.value}</p>
            <p className="text-sm text-gray-500">{stat.subtitle}</p>
          </div>
        ))}
      </div>

      {/* Additional Stats */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Platform Overview</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="text-sm font-medium text-gray-700 mb-2">QR Codes</h4>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Active:</span>
                <span className="text-sm font-semibold text-gray-900">
                  {stats.activeQRCodes}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Archived:</span>
                <span className="text-sm font-semibold text-gray-900">
                  {stats.archivedQRCodes}
                </span>
              </div>
            </div>
          </div>
          <div>
            <h4 className="text-sm font-medium text-gray-700 mb-2">Chats</h4>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Active:</span>
                <span className="text-sm font-semibold text-gray-900">
                  {stats.activeChats}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Expired:</span>
                <span className="text-sm font-semibold text-gray-900">
                  {stats.expiredChats}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

