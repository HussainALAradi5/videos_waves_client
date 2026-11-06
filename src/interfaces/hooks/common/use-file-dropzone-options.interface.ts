import type { Accept } from 'react-dropzone'

export interface UseFileDropzoneOptions {
  accept: Accept
  maxSizeBytes: number
  isDisabled?: boolean
  onFileChange: (file: File | null) => void
}
