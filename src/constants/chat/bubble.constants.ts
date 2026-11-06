/** Corner radii per position in a run (mine on the right, theirs on the left). */
export const BUBBLE_CORNERS = {
  mine: { single: '1.25rem', first: '1.25rem 1.25rem 0.375rem 1.25rem', middle: '1.25rem 0.375rem 0.375rem 1.25rem', last: '1.25rem 0.375rem 1.25rem 1.25rem' },
  theirs: { single: '1.25rem', first: '1.25rem 1.25rem 1.25rem 0.375rem', middle: '0.375rem 1.25rem 1.25rem 0.375rem', last: '0.375rem 1.25rem 1.25rem 1.25rem' }
} as const
