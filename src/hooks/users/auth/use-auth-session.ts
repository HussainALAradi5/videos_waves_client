'use client'

import { useCallback, useEffect, useMemo, useSyncExternalStore } from 'react'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { QUERY_KEYS } from '@/constants/common/query-keys.constants'
import { MESSAGES } from '@/constants/common/messages.constants'
import { Role } from '@/enums/users/roles/role.enum'
import type { AuthContextValue } from '@/interfaces/users/auth/auth-context-value.interface'
import type { AuthSession } from '@/interfaces/users/auth/auth-session.interface'
import { tokenStorage } from '@/services/storage/token-storage.service'
import { authService } from '@/services/users/auth/auth.service'
import { userService } from '@/services/users/user/user.service'
import { onSessionExpired } from '@/utilities/auth/session-events.utility'
import { notifyInfo } from '@/utilities/toast/notify.utility'

const NO_SESSION_ON_SERVER = () => false

/** Owns the signed-in state: stored tokens plus the current user loaded from GET /users/me. */
export const useAuthSession = (): AuthContextValue => {
  const queryClient = useQueryClient()
  const hasSession = useSyncExternalStore(tokenStorage.subscribe, tokenStorage.hasSession, NO_SESSION_ON_SERVER)
  const meQuery = useQuery({ queryKey: QUERY_KEYS.me, queryFn: userService.getMe, enabled: hasSession })

  const clearSession = useCallback(() => {
    tokenStorage.clear()
    queryClient.removeQueries({ queryKey: QUERY_KEYS.me })
    // `isLiked` and admin views depend on who is signed in.
    void queryClient.invalidateQueries({ queryKey: QUERY_KEYS.videos })
    queryClient.removeQueries({ queryKey: QUERY_KEYS.adminRequests })
  }, [queryClient])

  const signIn = useCallback(
    (session: AuthSession) => {
      tokenStorage.setTokens(session)
      queryClient.setQueryData(QUERY_KEYS.me, session.user)
      void queryClient.invalidateQueries({ queryKey: QUERY_KEYS.videos })
    },
    [queryClient]
  )

  const signOut = useCallback(async () => {
    try {
      await authService.logout()
    } finally {
      clearSession()
    }
  }, [clearSession])

  useEffect(
    () =>
      onSessionExpired(() => {
        clearSession()
        notifyInfo(MESSAGES.AUTH.SESSION_EXPIRED)
      }),
    [clearSession]
  )

  const user = hasSession ? (meQuery.data ?? null) : null
  return useMemo(
    () => ({
      user,
      isAuthenticated: user !== null,
      isAdmin: user?.role === Role.ADMIN,
      isLoading: hasSession && meQuery.isPending,
      signIn,
      signOut
    }),
    [user, hasSession, meQuery.isPending, signIn, signOut]
  )
}
