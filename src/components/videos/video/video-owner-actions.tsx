'use client'

import { Button, HStack } from '@chakra-ui/react'
import { LuPencil, LuTrash2 } from 'react-icons/lu'
import { MESSAGES } from '@/constants/common/messages.constants'
import { PALETTES } from '@/constants/common/theme.constants'
import { VIDEO_FIELDS } from '@/constants/videos/video/video-form-fields.constants'
import { videoFormSchema } from '@/validations/videos/video/video-form.validation'
import { useVideoOwnerActions } from '@/hooks/videos/video/use-video-owner-actions'
import type { VideoOwnerActionsProps } from '@/interfaces/components/videos/video/video-owner-actions-props.interface'
import { FormDialog } from '@/components/common/dialogs/form-dialog'
import { ConfirmDialog } from '@/components/common/dialogs/confirm-dialog'

export function VideoOwnerActions({ video }: VideoOwnerActionsProps) {
  const actions = useVideoOwnerActions(video.id)

  return (
    <HStack gap="2">
      <Button size="sm" variant="outline" onClick={actions.openEdit}>
        <LuPencil /> {MESSAGES.COMMON.EDIT}
      </Button>
      <Button size="sm" variant="outline" colorPalette={PALETTES.DANGER} onClick={actions.openDelete}>
        <LuTrash2 /> {MESSAGES.COMMON.DELETE}
      </Button>
      <FormDialog
        isOpen={actions.isEditOpen}
        onClose={actions.closeEdit}
        title={MESSAGES.VIDEOS.EDIT_TITLE}
        schema={videoFormSchema}
        fields={VIDEO_FIELDS}
        defaultValues={{ title: video.title, description: video.description }}
        submitLabel={MESSAGES.COMMON.SAVE}
        onSubmit={actions.update.mutateAsync}
        isSubmitting={actions.update.isPending}
      />
      <ConfirmDialog
        isOpen={actions.isDeleteOpen}
        onClose={actions.closeDelete}
        title={MESSAGES.VIDEOS.DELETE_TITLE}
        description={MESSAGES.VIDEOS.DELETE_DESCRIPTION}
        confirmLabel={MESSAGES.COMMON.DELETE}
        onConfirm={() => actions.remove.mutate()}
        isLoading={actions.remove.isPending}
      />
    </HStack>
  )
}
