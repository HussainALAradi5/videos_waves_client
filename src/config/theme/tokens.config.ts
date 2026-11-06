import { defineTokens } from '@chakra-ui/react'

/** Steel-blue brand scale: calm, single-hue blues. Coral is only the like accent. */
export const tokens = defineTokens({
  colors: {
    brand: {
      50: { value: '#eef4fa' },
      100: { value: '#d8e5f2' },
      200: { value: '#b4cce4' },
      300: { value: '#8aaed3' },
      400: { value: '#5b8fc4' },
      500: { value: '#3a7bb5' },
      600: { value: '#2c6496' },
      700: { value: '#1f4e79' },
      800: { value: '#1a3f61' },
      900: { value: '#16324c' },
      950: { value: '#0d1f30' }
    },
    coral: {
      400: { value: '#ff7a9c' },
      500: { value: '#ff5c8a' },
      600: { value: '#e5406f' }
    },
    steel: {
      300: { value: '#a9bdd1' },
      400: { value: '#7f9bb8' },
      500: { value: '#5c7ea0' },
      600: { value: '#466684' }
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
