import type { MediaKind } from '@/enums/media/media/media-kind.enum'

export interface RegisterMediaRequestDto {
  fileId: string
  kind: MediaKind
  originalName: string
}
