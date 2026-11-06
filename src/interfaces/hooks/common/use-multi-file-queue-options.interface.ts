import type { MediaKind } from '@/enums/media/media/media-kind.enum'

export interface UseMultiFileQueueOptions {
  kind: MediaKind
  maxFiles: number
}
