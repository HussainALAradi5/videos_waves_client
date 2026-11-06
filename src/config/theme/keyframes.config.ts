import { defineKeyframes } from '@chakra-ui/react'

export const keyframes = defineKeyframes({
  /** One wave tile is 50% of the strip, so shifting by -50% loops seamlessly. */
  waveDrift: { from: { transform: 'translateX(0)' }, to: { transform: 'translateX(-50%)' } },
  waveBob: { '0%, 100%': { transform: 'translateY(0)' }, '50%': { transform: 'translateY(6px)' } },
  /** A gentle rise and fall, shared by the logo's wave layers. */
  waveSwell: { '0%, 100%': { transform: 'translateY(0)' }, '50%': { transform: 'translateY(9%)' } },
  shimmer: { from: { backgroundPosition: '200% 0' }, to: { backgroundPosition: '-200% 0' } },
  typingDot: { '0%, 60%, 100%': { transform: 'translateY(0)', opacity: 0.4 }, '30%': { transform: 'translateY(-4px)', opacity: 1 } },
  gradientShift: { '0%, 100%': { backgroundPosition: '0% 50%' }, '50%': { backgroundPosition: '100% 50%' } }
})
