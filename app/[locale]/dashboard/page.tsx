import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { redirect } from 'next/navigation'
import DashboardContent from '@/components/dashboard/DashboardContent'

export default async function DashboardPage({
  params,
}: {
  params: { locale: string }
}) {
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect(`/${params.locale}/auth/signin`)
  }

  return <DashboardContent user={session.user} />
}

