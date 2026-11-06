import type { Accept } from 'react-dropzone'

export interface FileDropzoneProps {
  file: File | null
  onFileChange: (file: File | null) => void
  accept: Accept
  maxSizeBytes: number
  idleLabel: string
  activeLabel: string
  hint: string
  error?: string
  isDisabled?: boolean
}
