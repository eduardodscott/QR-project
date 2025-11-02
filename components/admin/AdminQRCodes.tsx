'use client'

import { useState, useEffect } from 'react'

interface QRCode {
  id: string
  code: string
  name: string
  message: string
  status: 'ACTIVE' | 'ARCHIVED'
  createdAt: string
  qrUrl: string
  user: {
    id: string
    email: string
    name: string | null
  }
  _count: {
    chats: number
  }
}

export default function AdminQRCodes() {
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
          ? '/api/admin/qr'
          : `/api/admin/qr?status=${filter}`
      const response = await fetch(url)
      if (response.ok) {
        const data = await response.json()
        setQRCodes(data)
      }
    } catch (error) {
      console.error('Error fetching QR codes:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleStatusChange = async (qrId: string, newStatus: 'ACTIVE' | 'ARCHIVED') => {
    try {
      const response = await fetch(`/api/admin/qr/${qrId}/status`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: newStatus }),
      })

      if (response.ok) {
        fetchQRCodes()
      } else {
        alert('Failed to update QR code status')
      }
    } catch (error) {
      console.error('Error updating QR code status:', error)
      alert('Failed to update QR code status')
    }
  }

  const handleDeleteQR = async (qrId: string, qrName: string) => {
    if (!confirm(`Are you sure you want to delete the QR code "${qrName}"? This will delete all associated chats and messages. This action cannot be undone.`)) {
      return
    }

    try {
      const response = await fetch(`/api/admin/qr/${qrId}/delete`, {
        method: 'DELETE',
      })

      if (response.ok) {
        fetchQRCodes()
        alert('QR code deleted successfully')
      } else {
        const data = await response.json()
        alert(data.error || 'Failed to delete QR code')
      }
    } catch (error) {
      console.error('Error deleting QR code:', error)
      alert('Failed to delete QR code')
    }
  }

  const handleViewChats = (qrId: string) => {
    // Open chats modal or navigate to chats view
    window.location.href = `/admin/qr/${qrId}/chats`
  }

  if (loading) {
    return (
      <div className="text-center py-12">
        <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        <p className="mt-4 text-gray-500">Loading QR codes...</p>
      </div>
    )
  }

  return (
    <div>
      <div className="mb-6 flex justify-between items-center">
        <h2 className="text-xl font-semibold text-gray-900">All QR Codes</h2>
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
                Chats
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Created
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {qrCodes.map((qr) => (
              <tr key={qr.id}>
                <td className="px-6 py-4">
                  <div>
                    <div className="text-sm font-medium text-gray-900">{qr.name}</div>
                    <div className="text-sm text-gray-500">{qr.code}</div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div>
                    <div className="text-sm text-gray-900">{qr.user.name || 'No name'}</div>
                    <div className="text-sm text-gray-500">{qr.user.email}</div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`px-2 py-1 text-xs rounded ${
                      qr.status === 'ACTIVE'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-gray-100 text-gray-800'
                    }`}
                  >
                    {qr.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {qr._count.chats}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {new Date(qr.createdAt).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  <div className="flex gap-2 items-center">
                    <select
                      value={qr.status}
                      onChange={(e) =>
                        handleStatusChange(qr.id, e.target.value as 'ACTIVE' | 'ARCHIVED')
                      }
                      className="px-3 py-1 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="ACTIVE">ACTIVE</option>
                      <option value="ARCHIVED">ARCHIVED</option>
                    </select>
                    <button
                      onClick={() => handleViewChats(qr.id)}
                      className="px-3 py-1 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 text-sm"
                      title="View chats for this QR code"
                    >
                      View Chats
                    </button>
                    <button
                      onClick={() => handleDeleteQR(qr.id, qr.name)}
                      className="px-3 py-1 bg-red-50 text-red-700 rounded-lg hover:bg-red-100 text-sm"
                      title="Delete QR code"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

