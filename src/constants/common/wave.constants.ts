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
  { color: 'violet.500', opacity: 0.08, duration: 'wave', height: '5.5rem', isReversed: false },
  { color: 'coral.500', opacity: 0.06, duration: 'waveSlow', height: '4rem', isReversed: false }
] as const

export const WAVE_LOADER_BARS = 5
