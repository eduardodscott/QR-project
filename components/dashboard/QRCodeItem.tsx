'use client'

import { useState, useEffect } from 'react'
import QRCodeGenerator from 'qrcode'

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

interface QRCodeItemProps {
  qr: QRCode
  onArchive: () => void
  onDelete: () => void
  onRefresh: () => void
}

export default function QRCodeItem({
  qr,
  onArchive,
  onDelete,
}: QRCodeItemProps) {
  const [qrImage, setQrImage] = useState<string | null>(null)
  const [showQR, setShowQR] = useState(false)

  useEffect(() => {
    if (showQR && !qrImage) {
      QRCodeGenerator.toDataURL(qr.qrUrl, { width: 200, margin: 2 })
        .then((dataUrl) => setQrImage(dataUrl))
        .catch(console.error)
    }
  }, [showQR, qr.qrUrl, qrImage])

  const handleDownload = async () => {
    if (!qrImage) {
      const dataUrl = await QRCodeGenerator.toDataURL(qr.qrUrl, {
        width: 300,
        margin: 2,
      })
      setQrImage(dataUrl)
    }

    const link = document.createElement('a')
    link.download = `qr-${qr.code}.png`
    link.href = qrImage || (await QRCodeGenerator.toDataURL(qr.qrUrl, { width: 300, margin: 2 }))
    link.click()
  }

  return (
    <div
      className={`rounded-lg border p-4 hover:shadow-md transition-shadow ${
        qr.hasUnreadMessage
          ? 'bg-green-50 border-green-300'
          : 'bg-white border-gray-200'
      }`}
    >
      <div className="flex justify-between items-start mb-3">
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <h3 className="font-semibold text-gray-900">{qr.name}</h3>
            {qr.hasUnreadMessage && (
              <span className="px-2 py-0.5 text-xs font-medium bg-green-500 text-white rounded-full">
                New Message
              </span>
            )}
          </div>
          <span
            className={`inline-block mt-1 px-2 py-1 text-xs rounded ${
              qr.status === 'ACTIVE'
                ? 'bg-green-100 text-green-800'
                : 'bg-gray-100 text-gray-800'
            }`}
          >
            {qr.status}
          </span>
        </div>
      </div>

      <p className="text-sm text-gray-600 mb-3 line-clamp-2">{qr.message}</p>

      <div className="text-xs text-gray-500 mb-3">
        Chats: {qr._count?.chats || 0}
      </div>

      {showQR && qrImage && (
        <div className="mb-3 p-2 bg-gray-50 rounded">
          <img src={qrImage} alt="QR Code" className="w-full" />
        </div>
      )}

      <div className="flex gap-2 flex-wrap">
        <button
          onClick={() => setShowQR(!showQR)}
          className="flex-1 px-3 py-1.5 text-xs bg-blue-50 text-blue-700 rounded hover:bg-blue-100"
        >
          {showQR ? 'Hide' : 'Show'} QR
        </button>
        {qrImage && (
          <button
            onClick={handleDownload}
            className="flex-1 px-3 py-1.5 text-xs bg-gray-50 text-gray-700 rounded hover:bg-gray-100"
          >
            Download
          </button>
        )}
        <button
          onClick={onArchive}
          className="flex-1 px-3 py-1.5 text-xs bg-yellow-50 text-yellow-700 rounded hover:bg-yellow-100"
        >
          {qr.status === 'ACTIVE' ? 'Archive' : 'Unarchive'}
        </button>
        <button
          onClick={onDelete}
          className="px-3 py-1.5 text-xs bg-red-50 text-red-700 rounded hover:bg-red-100"
        >
          Delete
        </button>
      </div>

      <div className="mt-3 pt-3 border-t border-gray-100 flex justify-between items-center">
        <a
          href={qr.qrUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs text-blue-600 hover:text-blue-800"
        >
          View QR Page →
        </a>
        <a
          href={`/dashboard/qr/${qr.id}/chats`}
          className="text-xs px-2 py-1 bg-green-50 text-green-700 rounded hover:bg-green-100"
        >
          View Chats ({qr._count?.chats || 0})
        </a>
      </div>
    </div>
  )
}

