import { defineGlobalStyles } from '@chakra-ui/react'

export const globalCss = defineGlobalStyles({
  'html, body': { bg: 'app.canvas', color: 'fg', minHeight: '100dvh' },
  body: { overflowX: 'hidden' },
  '::selection': { bg: 'brand.muted' },
  // Respect the OS setting everywhere CSS animations run (waves, shimmer, typing dots).
  '*, *::before, *::after': {
    _motionReduce: { animationDuration: '0.01ms !important', animationIterationCount: '1 !important' }
  }
})
