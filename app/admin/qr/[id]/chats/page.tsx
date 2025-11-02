import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { redirect } from 'next/navigation'
import QRCodeChatsView from '@/components/admin/QRCodeChatsView'

export default async function QRCodeChatsPage({
  params,
}: {
  params: { id: string }
}) {
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect('/auth/signin')
  }

  if (session.user.role !== 'ADMIN') {
    redirect('/dashboard')
  }

  return <QRCodeChatsView qrCodeId={params.id} />
}

