'use client'

import { useRef } from 'react'
import { HStack, Stack } from '@chakra-ui/react'
import { LuCamera, LuTrash2 } from 'react-icons/lu'
import { SETTINGS_MESSAGES } from '@/constants/users/settings/settings-messages.constants'
import type { AvatarEditorProps } from '@/interfaces/components/users/settings/avatar-editor-props.interface'
import { useAvatarEditor } from '@/hooks/users/user/use-avatar-editor'
import { UserAvatar } from '@/components/common/avatars/user-avatar'
import { GenericButton } from '@/components/common/buttons/generic-button'
import { GenericProgressBar } from '@/components/common/feedback/generic-progress-bar'

const IMAGE_ACCEPT = 'image/jpeg,image/png,image/webp,image/gif'

export function AvatarEditor({ user }: AvatarEditorProps) {
  const { progress, isSaving, onFileChosen, remove } = useAvatarEditor()
  const inputRef = useRef<HTMLInputElement | null>(null)
  return (
    <HStack gap="5" py="3" align="center">
      <UserAvatar user={user} size="2xl" hasRing />
      <Stack gap="3" flex="1">
        <HStack gap="2" wrap="wrap">
          <GenericButton size="sm" tone="gradient" leftIcon={<LuCamera />} onClick={() => inputRef.current?.click()} isLoading={isSaving}>
            {SETTINGS_MESSAGES.PHOTO_UPLOAD}
          </GenericButton>
          {user.avatarUrl && (
            <GenericButton size="sm" tone="dangerGhost" leftIcon={<LuTrash2 />} onClick={remove} disabled={isSaving}>
              {SETTINGS_MESSAGES.PHOTO_REMOVE}
            </GenericButton>
          )}
        </HStack>
        {progress !== null && <GenericProgressBar value={progress} showValue />}
        <input ref={inputRef} type="file" accept={IMAGE_ACCEPT} hidden onChange={(event) => onFileChosen(event.target.files?.[0])} />
      </Stack>
    </HStack>
  )
}
