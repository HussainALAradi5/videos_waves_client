/**
 * One seamless wave tile drawn twice side by side (viewBox 0..2880 x 0..120): drifting the strip
 * left by half its width loops without a seam.
 */
export const WAVE_PATH =
  'M0 60 C 240 10 480 110 720 60 C 960 10 1200 110 1440 60 C 1680 10 1920 110 2160 60 C 2400 10 2640 110 2880 60 L 2880 120 L 0 120 Z'
export const WAVE_VIEWBOX = '0 0 2880 120'

/** Back to front: slow and faint, then faster and stronger. */
export const WAVE_LAYERS = [
  { color: 'brand.400', opacity: 0.1, duration: 'waveSlow', height: '7rem', isReversed: true },
  { color: 'steel.500', opacity: 0.08, duration: 'wave', height: '5.5rem', isReversed: false },
  { color: 'brand.700', opacity: 0.06, duration: 'waveSlow', height: '4rem', isReversed: false }
] as const

export const WAVE_LOADER_BARS = 5

/** The logo's sea, back to front: each layer rolls faster, sits lower, and swells a beat later. */
export const WAVE_MARK_LAYERS = [
  { opacity: 0.35, height: '78%', drift: '6s', swell: '4s', delay: '0s', isReversed: true },
  { opacity: 0.6, height: '62%', drift: '4s', swell: '4s', delay: '-1s', isReversed: false },
  { opacity: 0.95, height: '46%', drift: '2.6s', swell: '4s', delay: '-2s', isReversed: false }
] as const
