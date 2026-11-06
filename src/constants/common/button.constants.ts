/** Visual tones every GenericButton can take; each maps to a Chakra variant and palette. */
export const BUTTON_TONES = {
  primary: { variant: 'solid', colorPalette: 'brand' },
  gradient: { variant: 'solid', colorPalette: 'brand' },
  secondary: { variant: 'subtle', colorPalette: 'gray' },
  outline: { variant: 'outline', colorPalette: 'gray' },
  ghost: { variant: 'ghost', colorPalette: 'gray' },
  danger: { variant: 'solid', colorPalette: 'red' },
  dangerGhost: { variant: 'ghost', colorPalette: 'red' }
} as const

export type ButtonTone = keyof typeof BUTTON_TONES
