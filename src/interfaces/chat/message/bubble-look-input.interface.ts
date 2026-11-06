import type { BubbleColor } from '@/enums/users/settings/bubble-color.enum'
import type { BubbleStyle } from '@/enums/users/settings/bubble-style.enum'

export interface BubbleLookInput {
  isMine: boolean
  isUnsent: boolean
  style: BubbleStyle
  myColor: BubbleColor
  othersColor: BubbleColor
}
