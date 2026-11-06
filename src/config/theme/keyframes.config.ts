import { defineKeyframes } from '@chakra-ui/react'

export const keyframes = defineKeyframes({
  /** One wave tile is 50% of the strip, so shifting by -50% loops seamlessly. */
  waveDrift: { from: { transform: 'translateX(0)' }, to: { transform: 'translateX(-50%)' } },
  waveBob: { '0%, 100%': { transform: 'translateY(0)' }, '50%': { transform: 'translateY(6px)' } },
  /** A gentle rise and fall, shared by the logo's wave layers. */
  waveSwell: { '0%, 100%': { transform: 'translateY(0)' }, '50%': { transform: 'translateY(9%)' } },
  /** Background waves: rise, stretch a little, and settle, from the bottom edge. */
  waveRoll: {
    '0%, 100%': { transform: 'translateY(0) scaleY(1)' },
    '50%': { transform: 'translateY(6%) scaleY(1.12)' }
  },
  shimmer: { from: { backgroundPosition: '200% 0' }, to: { backgroundPosition: '-200% 0' } },
  typingDot: { '0%, 60%, 100%': { transform: 'translateY(0)', opacity: 0.4 }, '30%': { transform: 'translateY(-4px)', opacity: 1 } },
  /** The bar under a toast empties as its time runs out. */
  toastCountdown: { from: { transform: 'scaleX(1)' }, to: { transform: 'scaleX(0)' } },
  gradientShift: { '0%, 100%': { backgroundPosition: '0% 50%' }, '50%': { backgroundPosition: '100% 50%' } }
})
