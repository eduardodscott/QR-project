'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import QRCodePageClient from '@/components/qr/QRCodePageClient'

export default function QRCodePage() {
  const params = useParams()
  const code = params.code as string
  const [data, setData] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (code) {
      fetchQRCode()
    }
  }, [code])

  const fetchQRCode = async () => {
    if (!code) return
    
    try {
      const response = await fetch(`/api/qr/${code}/scan`)

      if (!response.ok) {
        if (response.status === 404) {
          setError('not-found')
        } else if (response.status === 400) {
          setError('inactive')
        } else {
          setError('error')
        }
        setLoading(false)
        return
      }

      const result = await response.json()
      setData(result)
      setLoading(false)
    } catch (err) {
      console.error('Error loading QR code:', err)
      setError('error')
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mb-4"></div>
          <p className="text-gray-600">Loading QR code...</p>
        </div>
      </div>
    )
  }

  if (error === 'not-found') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">QR Code Not Found</h1>
          <p className="text-gray-600">
            This QR code does not exist or has been removed.
          </p>
        </div>
      </div>
    )
  }

  if (error === 'inactive') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">QR Code Inactive</h1>
          <p className="text-gray-600">
            This QR code has been archived and is no longer active.
          </p>
        </div>
      </div>
    )
  }

  if (error || !data) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Error Loading QR Code</h1>
          <p className="text-gray-600">Please try again later.</p>
        </div>
      </div>
    )
  }

  return <QRCodePageClient initialData={data} />
}

