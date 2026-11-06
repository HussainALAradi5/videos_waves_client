'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { MESSAGES } from '@/constants/common/messages.constants'
import { QUERY_KEYS } from '@/constants/common/query-keys.constants'
import type { ProfileFormValues } from '@/validations/users/user/profile-form.validation'
import type { ChangePasswordFormValues } from '@/validations/users/user/change-password-form.validation'
import { userService } from '@/services/users/user/user.service'
import { notifyError, notifySuccess } from '@/utilities/toast/notify.utility'
import { useAuth } from '../auth/use-auth'

/** Edit profile, change password, and deactivate; each closes its dialog through `onDone`. */
export const useProfileActions = (onDone: () => void) => {
  const queryClient = useQueryClient()
  const { signIn, signOut } = useAuth()

  const updateProfile = useMutation({
    mutationFn: (values: ProfileFormValues) => userService.updateMe({ ...values, image: values.image || null }),
    onSuccess: (user) => {
      queryClient.setQueryData(QUERY_KEYS.me, user)
      notifySuccess(MESSAGES.PROFILE.PROFILE_UPDATED)
      onDone()
    },
    onError: notifyError
  })

  // The server revokes older sessions and returns a fresh one for this device.
  const changePassword = useMutation({
    mutationFn: (values: ChangePasswordFormValues) => userService.changePassword(values),
    onSuccess: (session) => {
      signIn(session)
      notifySuccess(MESSAGES.PROFILE.PASSWORD_CHANGED)
      onDone()
    },
    onError: notifyError
  })

  const deactivate = useMutation({
    mutationFn: userService.deactivate,
    onSuccess: async () => {
      await signOut().catch(() => undefined)
      notifySuccess(MESSAGES.PROFILE.DEACTIVATED)
    },
    onError: notifyError
  })

  return { updateProfile, changePassword, deactivate }
}
