import { Suspense } from 'react'
import type { Metadata } from 'next'
import { LoadingState } from '@/components/common/feedback/loading-state'
import { GuestOnly } from '@/middlewares/auth/guest-only'
import { RegisterView } from '@/views/users/register-view'

export const metadata: Metadata = { title: 'Create account' }

export default function RegisterPage() {
  return (
    <Suspense fallback={<LoadingState />}>
      <GuestOnly>
        <RegisterView />
      </GuestOnly>
    </Suspense>
  )
}
