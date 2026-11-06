/**
 * One seamless wave tile drawn twice side by side (viewBox 0..2880 x 0..120): drifting the strip
 * left by half its width loops without a seam.
 */
export const WAVE_PATH =
  'M0 60 C 240 10 480 110 720 60 C 960 10 1200 110 1440 60 C 1680 10 1920 110 2160 60 C 2400 10 2640 110 2880 60 L 2880 120 L 0 120 Z'
export const WAVE_VIEWBOX = '0 0 2880 120'

/** Back to front: slow and faint, then faster and stronger; each rolls a beat after the one behind it. */
export const WAVE_LAYERS = [
  { color: 'brand.400', opacity: 0.14, duration: 'waveSlow', height: '8rem', isReversed: true, rollDelay: '0s' },
  { color: 'steel.500', opacity: 0.12, duration: 'wave', height: '6rem', isReversed: false, rollDelay: '-1.5s' },
  { color: 'brand.500', opacity: 0.16, duration: 'waveFast', height: '4.25rem', isReversed: true, rollDelay: '-3s', hasGradient: true },
  { color: 'brand.700', opacity: 0.1, duration: 'wave', height: '2.75rem', isReversed: false, rollDelay: '-4.5s' }
] as const

/** The front wave's colour, left to right: brand blue into rose pink and back, so the loop has no seam. */
export const WAVE_GRADIENT_STOPS = [
  { offset: '0%', color: 'var(--chakra-colors-brand-400)' },
  { offset: '50%', color: 'var(--chakra-colors-rose-400)' },
  { offset: '100%', color: 'var(--chakra-colors-brand-400)' }
] as const

export const WAVE_LOADER_BARS = 5

/** The sidebar join card's own small sea. */
export const SIDEBAR_CARD_WAVES = [
  { color: 'brand.400', opacity: 0.25, duration: 'wave', height: '2.75rem', isReversed: true },
  { color: 'rose.400', opacity: 0.2, duration: 'waveFast', height: '2rem', isReversed: false }
] as const

/** The logo's sea, back to front: each layer rolls faster, sits lower, and swells a beat later. */
export const WAVE_MARK_LAYERS = [
  { opacity: 0.35, height: '78%', drift: '6s', swell: '4s', delay: '0s', isReversed: true },
  { opacity: 0.6, height: '62%', drift: '4s', swell: '4s', delay: '-1s', isReversed: false },
  { opacity: 0.95, height: '46%', drift: '2.6s', swell: '4s', delay: '-2s', isReversed: false }
] as const
