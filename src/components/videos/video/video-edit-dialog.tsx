'use client'

import { MESSAGES } from '@/constants/common/messages.constants'
import { VIDEO_FIELDS } from '@/constants/videos/video/video-form-fields.constants'
import type { VideoEditDialogProps } from '@/interfaces/components/videos/video/video-edit-dialog-props.interface'
import { videoFormSchema } from '@/validations/videos/video/video-form.validation'
import { GenericModal } from '@/components/common/dialogs/generic-modal'
import { GenericForm } from '@/components/common/forms/generic-form'

export function VideoEditDialog({ video, isOpen, onClose, onSave }: VideoEditDialogProps) {
  return (
    <GenericModal isOpen={isOpen} onClose={onClose} title={MESSAGES.VIDEOS.EDIT_TITLE}>
      <GenericForm
        schema={videoFormSchema}
        fields={VIDEO_FIELDS}
        defaultValues={{ title: video.title, description: video.description }}
        submitLabel={MESSAGES.COMMON.SAVE}
        onSubmit={onSave}
      />
    </GenericModal>
  )
}
