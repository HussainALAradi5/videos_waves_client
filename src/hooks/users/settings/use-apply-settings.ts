'use client'

import { useEffect } from 'react'
import { useTheme } from 'next-themes'
import { useAuth } from '@/hooks/users/auth/use-auth'
import { useSettings } from './use-settings'

/** Applies settings that change the whole app: the theme follows the account across devices. */
export const useApplySettings = (): void => {
  const { isAuthenticated } = useAuth()
  const { theme } = useSettings()
  const { setTheme } = useTheme()
  useEffect(() => {
    if (isAuthenticated) setTheme(theme)
  }, [isAuthenticated, theme, setTheme])
}
