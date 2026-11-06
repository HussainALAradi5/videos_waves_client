'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { PAGE_SIZES } from '@/constants/common/limits.constants'
import { QUERY_KEYS } from '@/constants/common/query-keys.constants'
import { NOTIFICATION_MESSAGES } from '@/constants/notifications/notification.constants'
import type { UserSummary } from '@/interfaces/users/profile/user-summary.interface'
import { socialService } from '@/services/users/social/social.service'
import { notifyError, notifySuccess } from '@/utilities/toast/notify.utility'
import { usePagedList } from '@/hooks/common/use-paged-list'

/** People waiting to follow your private account, with Accept and Decline. */
export const useFollowRequests = (isEnabled = true) => {
  const queryClient = useQueryClient()
  const list = usePagedList<UserSummary>({
    queryKey: QUERY_KEYS.followRequests,
    fetchPage: (page, signal) => socialService.followRequests({ page, pageSize: PAGE_SIZES.PEOPLE }, signal),
    isEnabled
  })
  const refresh = () => Promise.all([queryClient.invalidateQueries({ queryKey: QUERY_KEYS.people }), queryClient.invalidateQueries({ queryKey: QUERY_KEYS.me })])
  const accept = useMutation({
    mutationFn: socialService.acceptRequest,
    onSuccess: async (result) => {
      await refresh()
      notifySuccess(NOTIFICATION_MESSAGES.ACCEPTED(result.userName))
    },
    onError: notifyError
  })
  const decline = useMutation({
    mutationFn: socialService.declineRequest,
    onSuccess: async () => {
      await refresh()
      notifySuccess(NOTIFICATION_MESSAGES.DECLINED)
    },
    onError: notifyError
  })
  return { ...list, accept: (userName: string) => accept.mutate(userName), decline: (userName: string) => decline.mutate(userName) }
}
