'use client'

import { useQuery } from '@tanstack/react-query'
import { QUERY_KEYS } from '@/constants/common/query-keys.constants'
import { DEFAULT_SETTINGS } from '@/constants/users/settings/settings.constants'
import type { UserSettings } from '@/interfaces/users/settings/user-settings.interface'
import { userService } from '@/services/users/user/user.service'
import { useAuth } from '@/hooks/users/auth/use-auth'

/** The signed-in user settings (defaults for guests and while loading). */
export const useSettings = (): UserSettings => {
  const { isAuthenticated } = useAuth()
  const query = useQuery({ queryKey: QUERY_KEYS.settings, queryFn: userService.getSettings, enabled: isAuthenticated })
  return isAuthenticated && query.data ? query.data : DEFAULT_SETTINGS
}
