'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { QUERY_KEYS } from '@/constants/common/query-keys.constants'
import type { UpdateSettingsRequestDto } from '@/dtos/users/settings/update-settings-request.dto'
import type { UserSettings } from '@/interfaces/users/settings/user-settings.interface'
import { userService } from '@/services/users/user/user.service'
import { notifyError } from '@/utilities/toast/notify.utility'

/** Saves settings optimistically: the UI changes at once and rolls back if the server refuses. */
export const useUpdateSetting = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (changes: UpdateSettingsRequestDto) => userService.updateSettings(changes),
    onMutate: async (changes) => {
      await queryClient.cancelQueries({ queryKey: QUERY_KEYS.settings })
      const previous = queryClient.getQueryData<UserSettings>(QUERY_KEYS.settings)
      if (previous) queryClient.setQueryData(QUERY_KEYS.settings, { ...previous, ...changes })
      return { previous }
    },
    onError: (error, _changes, context) => {
      if (context?.previous) queryClient.setQueryData(QUERY_KEYS.settings, context.previous)
      notifyError(error)
    },
    onSuccess: (saved) => queryClient.setQueryData(QUERY_KEYS.settings, saved)
  })
}
