import { BUBBLE_BACKGROUNDS } from '@/constants/users/settings/settings.constants'
import { BubbleColor } from '@/enums/users/settings/bubble-color.enum'
import { BubbleStyle } from '@/enums/users/settings/bubble-style.enum'
import type { BubbleLookInput } from '@/interfaces/chat/message/bubble-look-input.interface'

/** Background, text colour, and border of one bubble from the reader's chat settings. */
export const bubbleLook = ({ isMine, isUnsent, style, myColor, othersColor }: BubbleLookInput) => {
  if (isUnsent) return { bg: 'bg.muted', color: 'fg.muted' }
  const color = isMine ? myColor : othersColor
  if (style === BubbleStyle.MINIMAL) {
    // Outlined: a faint tint of your colour for yours, a hairline for theirs.
    return isMine
      ? { bg: 'brand.subtle', color: 'fg', borderWidth: '1px', borderColor: 'brand.emphasized' }
      : { bg: 'transparent', color: 'fg', borderWidth: '1px', borderColor: 'app.border' }
  }
  if (color === BubbleColor.NEUTRAL) return { bg: 'app.bubbleOther', color: 'fg' }
  return { bgImage: BUBBLE_BACKGROUNDS[color], color: 'white' }
}
