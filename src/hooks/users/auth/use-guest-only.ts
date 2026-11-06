'use client'

import { useEffect, useRef } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { REDIRECT_QUERY_PARAM } from '@/constants/common/routes.constants'
import { toSafeRedirectPath } from '@/utilities/routes/redirect.utility'
import { MESSAGES } from '@/constants/common/messages.constants'
import { notifyInfo } from '@/utilities/toast/notify.utility'
import { useAuth } from './use-auth'

/** Sign-in and sign-up pages send people who are already signed in to where they were going (with a note why). */
export const useGuestOnly = () => {
  const { isAuthenticated, isLoading } = useAuth()
  const router = useRouter()
  const redirectTo = useSearchParams().get(REDIRECT_QUERY_PARAM)
  const hasWarned = useRef(false)

  useEffect(() => {
    if (isLoading || !isAuthenticated) return
    // Opened directly while signed in (not right after signing in): say why the page is not shown.
    if (!redirectTo && !hasWarned.current) {
      hasWarned.current = true
      notifyInfo(MESSAGES.AUTH.ALREADY_SIGNED_IN)
    }
    router.replace(toSafeRedirectPath(redirectTo))
  }, [isAuthenticated, isLoading, redirectTo, router])

  return { isAllowed: !isLoading && !isAuthenticated }
}
