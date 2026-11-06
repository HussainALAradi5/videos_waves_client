'use client'

import type { PropsWithChildren } from 'react'
import { LoadingState } from '@/components/common/feedback/loading-state'
import { useGuestOnly } from '@/hooks/users/auth/use-guest-only'

/** Renders children only for visitors who are not signed in. */
export function GuestOnly({ children }: PropsWithChildren) {
  const { isAllowed } = useGuestOnly()
  return isAllowed ? <>{children}</> : <LoadingState />
}
