'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { QUERY_KEYS } from '@/constants/common/query-keys.constants'
import type { Profile } from '@/interfaces/users/profile/profile.interface'
import { socialService } from '@/services/users/social/social.service'
import { buildLoginPath } from '@/utilities/routes/redirect.utility'
import { notifyError } from '@/utilities/toast/notify.utility'
import { useAuth } from '@/hooks/users/auth/use-auth'

/** Optimistic follow toggle: the button and follower count change at once and roll back on error. */
export const useFollow = (userName: string, isFollowing: boolean) => {
  const queryClient = useQueryClient()
  const router = useRouter()
  const { isAuthenticated } = useAuth()
  const profileKey = QUERY_KEYS.profile(userName)

  const mutation = useMutation({
    mutationFn: (follow: boolean) => (follow ? socialService.follow(userName) : socialService.unfollow(userName)),
    onMutate: (follow) => {
      const previous = queryClient.getQueryData<Profile>(profileKey)
      if (previous) {
        queryClient.setQueryData<Profile>(profileKey, {
          ...previous,
          isFollowing: follow,
          followersCount: Math.max(0, previous.followersCount + (follow ? 1 : -1))
        })
      }
      return { previous }
    },
    onError: (error, _follow, context) => {
      if (context?.previous) queryClient.setQueryData(profileKey, context.previous)
      notifyError(error)
    },
    onSettled: () => {
      void queryClient.invalidateQueries({ queryKey: QUERY_KEYS.people })
      void queryClient.invalidateQueries({ queryKey: QUERY_KEYS.me })
    }
  })

  const toggle = () => {
    if (!isAuthenticated) return router.push(buildLoginPath(window.location.pathname))
    return mutation.mutateAsync(!isFollowing)
  }
  return { toggle, isPending: mutation.isPending }
}
