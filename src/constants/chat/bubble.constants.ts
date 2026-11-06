import { BubbleStyle } from '@/enums/users/settings/bubble-style.enum'

const ROUND = '1.25rem'
const ROUND_TAIL = '0.375rem'
const SQUARE = '0.5rem'
const SQUARE_TAIL = '0.125rem'

const corners = (big: string, tail: string) => ({
  mine: { single: big, first: `${big} ${big} ${tail} ${big}`, middle: `${big} ${tail} ${tail} ${big}`, last: `${big} ${tail} ${big} ${big}` },
  theirs: { single: big, first: `${big} ${big} ${big} ${tail}`, middle: `${tail} ${big} ${big} ${tail}`, last: `${tail} ${big} ${big} ${big}` }
})

/** Corner radii per bubble shape and position in a run (mine on the right, theirs on the left). */
export const BUBBLE_CORNERS = {
  [BubbleStyle.ROUNDED]: corners(ROUND, ROUND_TAIL),
  [BubbleStyle.SQUARE]: corners(SQUARE, SQUARE_TAIL),
  [BubbleStyle.MINIMAL]: corners('0.75rem', '0.75rem')
} as const

export const BUBBLE_PREVIEW = {
  THEIRS: 'Hey! Did you see the new wave?',
  MINE: 'Just watched it. So calm.',
  LABEL: 'Preview'
} as const
