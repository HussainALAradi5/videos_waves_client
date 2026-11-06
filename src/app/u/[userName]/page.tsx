import type { Metadata } from 'next'
import { ProfileView } from '@/views/users/profile-view'

export async function generateMetadata({ params }: PageProps<'/u/[userName]'>): Promise<Metadata> {
  const { userName } = await params
  return { title: decodeURIComponent(userName) }
}

export default async function ProfilePage({ params }: PageProps<'/u/[userName]'>) {
  const { userName } = await params
  return <ProfileView userName={decodeURIComponent(userName)} />
}
