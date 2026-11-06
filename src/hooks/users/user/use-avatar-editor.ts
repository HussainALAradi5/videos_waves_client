'use client'

import { useState } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { QUERY_KEYS } from '@/constants/common/query-keys.constants'
import { SETTINGS_MESSAGES } from '@/constants/users/settings/settings-messages.constants'
import { MediaKind } from '@/enums/media/media/media-kind.enum'
import { mediaUploadService } from '@/services/media/media/media-upload.service'
import { userService } from '@/services/users/user/user.service'
import { notifyError, notifySuccess } from '@/utilities/toast/notify.utility'

/** Upload a new profile photo (straight to the CDN, with progress) or go back to the standard avatar. */
export const useAvatarEditor = () => {
  const queryClient = useQueryClient()
  const [progress, setProgress] = useState<number | null>(null)

  const save = useMutation({
    mutationFn: async (file: File | null) => {
      if (!file) return userService.updateAvatar(null)
      const media = await mediaUploadService.upload(file, MediaKind.AVATAR, setProgress)
      return userService.updateAvatar(media.id)
    },
    onSuccess: (user) => {
      queryClient.setQueryData(QUERY_KEYS.me, user)
      void queryClient.invalidateQueries({ queryKey: QUERY_KEYS.people })
      notifySuccess(SETTINGS_MESSAGES.PHOTO_UPDATED)
    },
    onError: notifyError,
    onSettled: () => setProgress(null)
  })

  return {
    progress,
    isSaving: save.isPending,
    onFileChosen: (file: File | undefined) => file && save.mutate(file),
    remove: () => save.mutateAsync(null)
  }
}
