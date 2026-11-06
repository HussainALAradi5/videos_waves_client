import { Suspense } from 'react'
import type { Metadata } from 'next'
import { LoadingState } from '@/components/common/feedback/loading-state'
import { GuestOnly } from '@/middlewares/auth/guest-only'
import { LoginView } from '@/views/users/login-view'

export const metadata: Metadata = { title: 'Sign in' }

export default function LoginPage() {
  // Both components read ?redirect=, which requires a Suspense boundary for static rendering.
  return (
    <Suspense fallback={<LoadingState />}>
      <GuestOnly>
        <LoginView />
      </GuestOnly>
    </Suspense>
  )
}
