'use client'

import { useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { MEDIA_MESSAGES } from '@/constants/media/media/media-messages.constants'
import type { MultiFileDropzoneProps } from '@/interfaces/components/common/uploads/multi-file-dropzone-props.interface'

/** Drag-and-drop or click to pick several files, with type, size, and count checks. */
export const useMultiFileDropzone = ({ onFiles, accept, maxSizeBytes, maxFiles, isDisabled }: MultiFileDropzoneProps) => {
  const [rejection, setRejection] = useState<string | null>(null)
  const dropzone = useDropzone({
    accept,
    maxSize: maxSizeBytes,
    maxFiles,
    multiple: true,
    disabled: isDisabled,
    onDrop: (accepted, rejected) => {
      const reason = rejected[0]?.errors[0]?.code
      setRejection(
        reason === 'too-many-files' ? MEDIA_MESSAGES.TOO_MANY(maxFiles)
        : reason === 'file-too-large' ? MEDIA_MESSAGES.TOO_LARGE
        : reason ? MEDIA_MESSAGES.TYPE_NOT_ALLOWED
        : null
      )
      if (accepted.length > 0) onFiles(accepted)
    }
  })
  return { ...dropzone, rejection }
}
