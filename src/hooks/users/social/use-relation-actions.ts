'use client'

import { useState } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { QUERY_KEYS } from '@/constants/common/query-keys.constants'
import { SOCIAL_MESSAGES } from '@/constants/users/social/social-messages.constants'
import type { Profile } from '@/interfaces/users/profile/profile.interface'
import { socialService } from '@/services/users/social/social.service'
import { notifyError, notifySuccess } from '@/utilities/toast/notify.utility'

/** Block (after confirming) and restrict for a profile; caches for feeds, people, and chats refresh after. */
export const useRelationActions = (profile: Profile) => {
  const queryClient = useQueryClient()
  const [isBlockConfirmOpen, setIsBlockConfirmOpen] = useState(false)
  const refresh = () => Promise.all([QUERY_KEYS.people, QUERY_KEYS.videos, QUERY_KEYS.chat].map((queryKey) => queryClient.invalidateQueries({ queryKey })))

  const block = useMutation({
    mutationFn: () => (profile.isBlocked ? socialService.unblock(profile.userName) : socialService.block(profile.userName)),
    onSuccess: async (state) => {
      setIsBlockConfirmOpen(false)
      if (state.isActive) notifySuccess(SOCIAL_MESSAGES.BLOCKED(profile.userName))
      await refresh()
    },
    onError: notifyError
  })
  const restrict = useMutation({
    mutationFn: () => (profile.isRestricted ? socialService.unrestrict(profile.userName) : socialService.restrict(profile.userName)),
    onSuccess: async (state) => {
      if (state.isActive) notifySuccess(SOCIAL_MESSAGES.RESTRICT_DONE(profile.userName))
      await refresh()
    },
    onError: notifyError
  })
  return {
    isBlockConfirmOpen,
    requestBlock: () => (profile.isBlocked ? block.mutateAsync() : setIsBlockConfirmOpen(true)),
    confirmBlock: () => block.mutateAsync(),
    cancelBlock: () => setIsBlockConfirmOpen(false),
    isBlocking: block.isPending,
    toggleRestrict: () => restrict.mutateAsync()
  }
}
