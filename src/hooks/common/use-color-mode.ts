'use client'

import { useTheme } from 'next-themes'
import { ThemePreference } from '@/enums/users/settings/theme-preference.enum'
import { useAuth } from '@/hooks/users/auth/use-auth'
import { useUpdateSetting } from '@/hooks/users/settings/use-update-setting'

/** Light/dark toggle; for signed-in people it is saved to the account, so every device follows. */
export const useColorMode = () => {
  const { resolvedTheme, setTheme } = useTheme()
  const { isAuthenticated } = useAuth()
  const update = useUpdateSetting()
  const isDark = resolvedTheme === ThemePreference.DARK

  const toggleColorMode = () => {
    const next = isDark ? ThemePreference.LIGHT : ThemePreference.DARK
    setTheme(next)
    if (isAuthenticated) update.mutate({ theme: next })
  }
  return { isDark, toggleColorMode }
}
