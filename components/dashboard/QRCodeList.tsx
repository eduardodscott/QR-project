'use client'

import { useState, useEffect } from 'react'
import QRCodeItem from './QRCodeItem'
import QRCode from 'qrcode'

interface QRCode {
  id: string
  code: string
  name: string
  message: string
  status: 'ACTIVE' | 'ARCHIVED'
  createdAt: string
  qrUrl: string
  hasUnreadMessage?: boolean
  _count?: {
    chats: number
  }
}

export default function QRCodeList() {
  const [qrCodes, setQRCodes] = useState<QRCode[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState<'all' | 'ACTIVE' | 'ARCHIVED'>('all')

  useEffect(() => {
    fetchQRCodes()
  }, [filter])

  const fetchQRCodes = async () => {
    setLoading(true)
    try {
      const url =
        filter === 'all'
          ? '/api/qr/list'
          : `/api/qr/list?status=${filter}`
      const response = await fetch(url)
      const data = await response.json()
      setQRCodes(data)
    } catch (error) {
      console.error('Error fetching QR codes:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleArchive = async (id: string) => {
    try {
      const response = await fetch(`/api/qr/archive/${id}`, {
        method: 'PUT',
      })
      if (response.ok) {
        fetchQRCodes()
      }
    } catch (error) {
      console.error('Error archiving QR code:', error)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this QR code? This action cannot be undone.')) {
      return
    }
    try {
      const response = await fetch(`/api/qr/delete/${id}`, {
        method: 'DELETE',
      })
      if (response.ok) {
        fetchQRCodes()
      }
    } catch (error) {
      console.error('Error deleting QR code:', error)
    }
  }

  if (loading) {
    return (
      <div className="text-center py-12">
        <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        <p className="mt-4 text-gray-500">Loading QR codes...</p>
      </div>
    )
  }

  if (qrCodes.length === 0) {
    return (
      <div className="text-center py-12 bg-white rounded-lg border border-gray-200">
        <p className="text-gray-500 mb-4">No QR codes yet</p>
        <p className="text-sm text-gray-400">
          Create your first QR code to get started!
        </p>
      </div>
    )
  }

  return (
    <div>
      {/* Filter */}
      <div className="mb-4 flex gap-2">
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
          onClick={() => setFilter('ARCHIVED')}
          className={`px-4 py-2 rounded-lg text-sm ${
            filter === 'ARCHIVED'
              ? 'bg-blue-600 text-white'
              : 'bg-white text-gray-700 hover:bg-gray-50'
          }`}
        >
          Archived
        </button>
      </div>

      {/* QR Code Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {qrCodes.map((qr) => (
          <QRCodeItem
            key={qr.id}
            qr={qr}
            onArchive={() => handleArchive(qr.id)}
            onDelete={() => handleDelete(qr.id)}
            onRefresh={fetchQRCodes}
          />
        ))}
      </div>
    </div>
  )
}

