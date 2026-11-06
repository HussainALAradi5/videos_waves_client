import { defineGlobalStyles } from '@chakra-ui/react'

export const globalCss = defineGlobalStyles({
  'html, body': { bg: 'app.canvas', color: 'fg', minHeight: '100dvh' },
  body: { overflowX: 'hidden' },
  // Dark mode: two soft brand glows behind everything, so the canvas has depth instead of flat black.
  '.dark body': {
    bgImage:
      'radial-gradient(1100px 520px at 12% -8%, rgba(58,123,181,.14), transparent 60%), radial-gradient(900px 480px at 108% 6%, rgba(31,78,121,.12), transparent 60%)',
    bgAttachment: 'fixed',
    colorScheme: 'dark'
  },
  '::selection': { bg: 'brand.muted' },
  // Thin, quiet scrollbars that match the theme.
  '*': { scrollbarWidth: 'thin', scrollbarColor: 'var(--chakra-colors-border) transparent' },
  ':focus-visible': { outlineColor: 'brand.focusRing' },
  // Respect the OS setting everywhere CSS animations run (waves, shimmer, typing dots).
  '*, *::before, *::after': {
    _motionReduce: { animationDuration: '0.01ms !important', animationIterationCount: '1 !important' }
  }
})
