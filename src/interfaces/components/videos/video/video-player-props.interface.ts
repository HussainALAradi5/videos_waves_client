export interface VideoPlayerProps {
  src: string
  title: string
  /** Preview mode: no controls, muted, first frame only (used in cards). */
  isPreview?: boolean
  onPlay?: () => void
}
