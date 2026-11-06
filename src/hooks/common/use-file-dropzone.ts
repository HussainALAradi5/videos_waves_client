'use client'

import { useState } from 'react'
import { useDropzone } from 'react-dropzone'
import type { UseFileDropzoneOptions } from '@/interfaces/hooks/common/use-file-dropzone-options.interface'

/** Single-file drag-and-drop with type and size checks; the server re-validates every upload. */
export const useFileDropzone = ({ accept, maxSizeBytes, isDisabled, onFileChange }: UseFileDropzoneOptions) => {
  const [rejection, setRejection] = useState<string | null>(null)

  const dropzone = useDropzone({
    accept,
    maxSize: maxSizeBytes,
    multiple: false,
    disabled: isDisabled,
    onDrop: (accepted, rejected) => {
      setRejection(rejected[0]?.errors[0]?.message ?? null)
      onFileChange(accepted[0] ?? null)
    }
  })

  return { ...dropzone, rejection }
}
