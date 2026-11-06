import type { Accept } from 'react-dropzone'

export interface MultiFileDropzoneProps {
  onFiles: (files: File[]) => void
  accept: Accept
  maxSizeBytes: number
  maxFiles: number
  isDisabled?: boolean
  hint?: string
  /** A smaller inline button instead of the full drop area (chat composer). */
  isCompact?: boolean
}
