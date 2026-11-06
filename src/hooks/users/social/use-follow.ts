'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { QUERY_KEYS } from '@/constants/common/query-keys.constants'
import type { FollowRelation } from '@/interfaces/hooks/users/social/follow-relation.interface'
import type { Profile } from '@/interfaces/users/profile/profile.interface'
import { socialService } from '@/services/users/social/social.service'
import { buildLoginPath } from '@/utilities/routes/redirect.utility'
import { notifyError } from '@/utilities/toast/notify.utility'
import { useAuth } from '@/hooks/users/auth/use-auth'

/**
 * Optimistic follow toggle: the button and follower count change at once and roll back on error.
 * A private account shows Requested until its owner accepts; clicking again cancels.
 */
export const useFollow = (userName: string, { isFollowing, isRequested, isPrivate }: FollowRelation) => {
  const queryClient = useQueryClient()
  const router = useRouter()
  const { isAuthenticated } = useAuth()
  const profileKey = QUERY_KEYS.profile(userName)

  const mutation = useMutation({
    mutationFn: (follow: boolean) => (follow ? socialService.follow(userName) : socialService.unfollow(userName)),
    onMutate: (follow) => {
      const previous = queryClient.getQueryData<Profile>(profileKey)
      if (previous) {
        const becomesFollower = follow && !isPrivate
        queryClient.setQueryData<Profile>(profileKey, {
          ...previous,
          isFollowing: becomesFollower,
          isRequested: follow && isPrivate,
          followersCount: Math.max(0, previous.followersCount + (becomesFollower ? 1 : previous.isFollowing ? -1 : 0))
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
      void queryClient.invalidateQueries({ queryKey: QUERY_KEYS.videos })
      void queryClient.invalidateQueries({ queryKey: QUERY_KEYS.me })
    }
  })

  const toggle = () => {
    if (!isAuthenticated) return router.push(buildLoginPath(window.location.pathname))
    return mutation.mutateAsync(!(isFollowing || isRequested))
  }
  return { toggle, isPending: mutation.isPending }
}
