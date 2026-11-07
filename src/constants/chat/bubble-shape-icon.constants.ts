import { BubbleStyle } from '@/enums/users/settings/bubble-style.enum'

/** Corner radii of the tiny two-bubble picture beside each shape choice (theirs, then mine). */
export const BUBBLE_SHAPE_ICON_CORNERS: Record<BubbleStyle, { theirs: string; mine: string }> = {
  [BubbleStyle.ROUNDED]: { theirs: '7px 7px 7px 2px', mine: '7px 7px 2px 7px' },
  [BubbleStyle.SQUARE]: { theirs: '3px 3px 3px 1px', mine: '3px 3px 1px 3px' },
  [BubbleStyle.MINIMAL]: { theirs: '4px', mine: '4px' }
}
