'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { ADMIN_USERS_MESSAGES } from '@/constants/users/admin-users/admin-users.constants'
import { QUERY_KEYS } from '@/constants/common/query-keys.constants'
import { adminUsersService } from '@/services/users/admin-users/admin-users.service'
import { notifyError, notifySuccess } from '@/utilities/toast/notify.utility'

/** Activate or deactivate one account, then refresh every list that could show it or its content. */
export const useAccountStatus = () => {
  const queryClient = useQueryClient()
  const mutation = useMutation({
    mutationFn: ({ userName, isActive }: { userName: string; isActive: boolean }) => adminUsersService.setActive(userName, isActive),
    onSuccess: async (user) => {
      notifySuccess(user.isActive ? ADMIN_USERS_MESSAGES.ACTIVATED(user.userName) : ADMIN_USERS_MESSAGES.DEACTIVATED(user.userName))
      await Promise.all(
        [QUERY_KEYS.adminUsersAll, QUERY_KEYS.people, QUERY_KEYS.videos].map((queryKey) => queryClient.invalidateQueries({ queryKey }))
      )
    },
    onError: notifyError
  })
  return {
    setActive: (userName: string, isActive: boolean) => mutation.mutateAsync({ userName, isActive }),
    isPending: mutation.isPending
  }
}
