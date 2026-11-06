import { Suspense } from 'react'
import type { Metadata } from 'next'
import { LoadingState } from '@/components/common/feedback/loading-state'
import { LoginView } from '@/views/users/login-view'

export const metadata: Metadata = { title: 'Sign in' }

export default function LoginPage() {
  // LoginView reads ?redirect=, which requires a Suspense boundary for static rendering.
  return (
    <Suspense fallback={<LoadingState />}>
      <LoginView />
    </Suspense>
  )
}
