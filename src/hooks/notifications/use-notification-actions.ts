'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { QUERY_KEYS } from '@/constants/common/query-keys.constants'
import { NOTIFICATION_MESSAGES } from '@/constants/notifications/notification.constants'
import { notificationService } from '@/services/notifications/notification.service'
import { notifyError, notifySuccess } from '@/utilities/toast/notify.utility'

/** Mark one or all notifications read; the list and the badge refresh afterwards. */
export const useNotificationActions = () => {
  const queryClient = useQueryClient()
  const refresh = () => queryClient.invalidateQueries({ queryKey: QUERY_KEYS.notifications })
  const markRead = useMutation({ mutationFn: notificationService.markRead, onSuccess: refresh })
  const markAllRead = useMutation({
    mutationFn: notificationService.markAllRead,
    onSuccess: async () => {
      await refresh()
      notifySuccess(NOTIFICATION_MESSAGES.ALL_READ)
    },
    onError: notifyError
  })
  return {
    markRead: (id: string) => markRead.mutate(id),
    markAllRead: () => markAllRead.mutate(),
    isMarkingAll: markAllRead.isPending
  }
}
