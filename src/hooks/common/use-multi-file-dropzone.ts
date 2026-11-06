'use client'

import { useState } from 'react'
import { useDropzone, type FileRejection } from 'react-dropzone'
import { MEDIA_MESSAGES } from '@/constants/media/media/media-messages.constants'
import type { MultiFileDropzoneProps } from '@/interfaces/components/common/uploads/multi-file-dropzone-props.interface'
import { formatFileSize } from '@/utilities/files/file-size.utility'
import { ToastType } from '@/enums/common/toast-type.enum'
import { notify } from '@/utilities/toast/notify.utility'

/** Why one file was refused, naming the file and the limit it broke. */
const reasonFor = ({ file, errors }: FileRejection, maxSizeBytes: number | undefined, maxFiles: number | undefined): string => {
  const code = errors[0]?.code
  if (code === 'too-many-files') return MEDIA_MESSAGES.TOO_MANY(maxFiles ?? 0)
  if (code === 'file-too-large') return MEDIA_MESSAGES.FILE_TOO_LARGE(file.name, formatFileSize(maxSizeBytes ?? 0))
  return MEDIA_MESSAGES.FILE_TYPE_NOT_ALLOWED(file.name)
}

/** Drag-and-drop or click to pick several files, with type, size, and count checks; refusals also show as an error toast. */
export const useMultiFileDropzone = ({ onFiles, accept, maxSizeBytes, maxFiles, isDisabled }: MultiFileDropzoneProps) => {
  const [rejection, setRejection] = useState<string | null>(null)
  const dropzone = useDropzone({
    accept,
    maxSize: maxSizeBytes,
    maxFiles,
    multiple: true,
    disabled: isDisabled,
    onDrop: (accepted, rejected) => {
      const first = rejected[0]
      const message = first ? reasonFor(first, maxSizeBytes, maxFiles) : null
      setRejection(message)
      if (message) {
        notify(ToastType.ERROR, rejected.length > 1 ? MEDIA_MESSAGES.SKIPPED(rejected.length) : message, rejected.length > 1 ? { description: message } : undefined)
      }
      if (accepted.length > 0) onFiles(accepted)
    }
  })
  return { ...dropzone, rejection }
}
