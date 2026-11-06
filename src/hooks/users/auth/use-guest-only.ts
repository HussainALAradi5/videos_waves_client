'use client'

import { useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { REDIRECT_QUERY_PARAM } from '@/constants/common/routes.constants'
import { toSafeRedirectPath } from '@/utilities/routes/redirect.utility'
import { useAuth } from './use-auth'

/** Sign-in and sign-up pages send people who are already signed in to where they were going. */
export const useGuestOnly = () => {
  const { isAuthenticated, isLoading } = useAuth()
  const router = useRouter()
  const redirectTo = useSearchParams().get(REDIRECT_QUERY_PARAM)

  useEffect(() => {
    if (!isLoading && isAuthenticated) router.replace(toSafeRedirectPath(redirectTo))
  }, [isAuthenticated, isLoading, redirectTo, router])

  return { isAllowed: !isLoading && !isAuthenticated }
}
