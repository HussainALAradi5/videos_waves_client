'use client'

import { Progress } from '@chakra-ui/react'
import { BYTES_PER_MEGABYTE, MAX_VIDEO_UPLOAD_MB } from '@/constants/common/limits.constants'
import { MESSAGES } from '@/constants/common/messages.constants'
import { PALETTES } from '@/constants/common/theme.constants'
import { VIDEO_FIELDS } from '@/constants/videos/video/video-form-fields.constants'
import { VIDEO_ACCEPT } from '@/constants/videos/video/video-sort.constants'
import { videoFormSchema } from '@/validations/videos/video/video-form.validation'
import { useUploadVideo } from '@/hooks/videos/video/use-upload-video'
import { GenericForm } from '@/components/common/forms/generic-form'
import { FileDropzone } from '@/components/common/uploads/file-dropzone'

export function VideoUploadForm() {
  const { file, selectFile, fileError, progress, upload, isUploading } = useUploadVideo()

  return (
    <GenericForm
      schema={videoFormSchema}
      fields={VIDEO_FIELDS}
      defaultValues={{ title: '', description: '' }}
      submitLabel={MESSAGES.VIDEOS.UPLOAD_SUBMIT}
      onSubmit={upload}
      isSubmitting={isUploading}
    >
      <FileDropzone
        file={file}
        onFileChange={selectFile}
        accept={VIDEO_ACCEPT}
        maxSizeBytes={MAX_VIDEO_UPLOAD_MB * BYTES_PER_MEGABYTE}
        idleLabel={MESSAGES.VIDEOS.DROPZONE_IDLE}
        activeLabel={MESSAGES.VIDEOS.DROPZONE_ACTIVE}
        hint={MESSAGES.VIDEOS.DROPZONE_HINT(MAX_VIDEO_UPLOAD_MB)}
        error={fileError}
        isDisabled={isUploading}
      />
      {isUploading && (
        <Progress.Root value={progress} colorPalette={PALETTES.BRAND} striped animated>
          <Progress.Track>
            <Progress.Range />
          </Progress.Track>
        </Progress.Root>
      )}
    </GenericForm>
  )
}
