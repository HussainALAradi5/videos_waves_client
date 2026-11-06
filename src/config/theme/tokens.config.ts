import { defineTokens } from '@chakra-ui/react'

/** Ocean-to-sunset brand scale: the "wave" in Videos Waves. */
export const tokens = defineTokens({
  colors: {
    brand: {
      50: { value: '#e6f9ff' },
      100: { value: '#c2efff' },
      200: { value: '#8fe1ff' },
      300: { value: '#55ceff' },
      400: { value: '#22b8ff' },
      500: { value: '#0a9df0' },
      600: { value: '#0a7fd0' },
      700: { value: '#0f64a8' },
      800: { value: '#134f84' },
      900: { value: '#133f69' },
      950: { value: '#0b2745' }
    },
    coral: {
      400: { value: '#ff7a9c' },
      500: { value: '#ff5c8a' },
      600: { value: '#e5406f' }
    },
    violet: {
      400: { value: '#9b8cff' },
      500: { value: '#7b61ff' },
      600: { value: '#6145ea' }
    }
  },
  fonts: {
    heading: { value: 'var(--font-sans), system-ui, sans-serif' },
    body: { value: 'var(--font-sans), system-ui, sans-serif' }
  },
  radii: {
    bubble: { value: '1.25rem' }
  },
  durations: {
    wave: { value: '14s' },
    waveSlow: { value: '22s' }
  }
})
