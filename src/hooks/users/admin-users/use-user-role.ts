'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { ADMIN_USERS_MESSAGES } from '@/constants/users/admin-users/admin-users.constants'
import { QUERY_KEYS } from '@/constants/common/query-keys.constants'
import { Role } from '@/enums/users/roles/role.enum'
import { adminUsersService } from '@/services/users/admin-users/admin-users.service'
import { notifyError, notifySuccess } from '@/utilities/toast/notify.utility'

/** Admins only: make someone an admin or a regular user (never yourself; the server checks too). */
export const useUserRole = () => {
  const queryClient = useQueryClient()
  const mutation = useMutation({
    mutationFn: ({ userName, role }: { userName: string; role: Role }) => adminUsersService.setRole(userName, role),
    onSuccess: async (user) => {
      notifySuccess(ADMIN_USERS_MESSAGES.ROLE_CHANGED(user.userName, user.role === Role.ADMIN))
      await Promise.all([QUERY_KEYS.adminUsersAll, QUERY_KEYS.people].map((queryKey) => queryClient.invalidateQueries({ queryKey })))
    },
    onError: notifyError
  })
  return { setRole: (userName: string, role: Role) => mutation.mutateAsync({ userName, role }) }
}
