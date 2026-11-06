'use client'

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { QUERY_KEYS } from '@/constants/common/query-keys.constants'
import { SETTINGS_MESSAGES } from '@/constants/users/settings/settings-messages.constants'
import { authService } from '@/services/users/auth/auth.service'
import { notifyError, notifySuccess } from '@/utilities/toast/notify.utility'
import { useAuth } from './use-auth'

/** Signed-in devices: sign one out, or every device including this one. */
export const useSessions = () => {
  const queryClient = useQueryClient()
  const { signOutLocally } = useAuth()
  const sessions = useQuery({ queryKey: QUERY_KEYS.sessions, queryFn: authService.listSessions })

  const revoke = useMutation({
    mutationFn: authService.revokeSession,
    onSuccess: async () => {
      notifySuccess(SETTINGS_MESSAGES.SIGNED_OUT_DEVICE)
      await queryClient.invalidateQueries({ queryKey: QUERY_KEYS.sessions })
    },
    onError: notifyError
  })
  const everywhere = useMutation({ mutationFn: authService.logoutEverywhere, onSuccess: signOutLocally, onError: notifyError })

  return {
    sessions: sessions.data ?? [],
    isLoading: sessions.isPending,
    revoke: (sessionId: string) => revoke.mutateAsync(sessionId),
    signOutEverywhere: () => everywhere.mutateAsync()
  }
}
