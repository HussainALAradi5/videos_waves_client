import { defineSemanticTokens } from '@chakra-ui/react'

/** Light/dark values every component uses; `brand.*` makes `colorPalette="brand"` work like built-in palettes. */
export const semanticTokens = defineSemanticTokens({
  colors: {
    brand: {
      solid: { value: { _light: '{colors.brand.500}', _dark: '{colors.brand.400}' } },
      contrast: { value: 'white' },
      fg: { value: { _light: '{colors.brand.700}', _dark: '{colors.brand.300}' } },
      muted: { value: { _light: '{colors.brand.100}', _dark: '{colors.brand.900}' } },
      subtle: { value: { _light: '{colors.brand.50}', _dark: '{colors.brand.950}' } },
      emphasized: { value: { _light: '{colors.brand.200}', _dark: '{colors.brand.800}' } },
      focusRing: { value: '{colors.brand.400}' }
    },
    app: {
      canvas: { value: { _light: '#f6f8fb', _dark: '#070b12' } },
      surface: { value: { _light: 'white', _dark: '#0f1521' } },
      surfaceRaised: { value: { _light: 'white', _dark: '#161e2d' } },
      border: { value: { _light: 'rgba(15, 23, 42, 0.08)', _dark: 'rgba(148, 163, 184, 0.14)' } },
      glass: { value: { _light: 'rgba(255, 255, 255, 0.72)', _dark: 'rgba(15, 21, 33, 0.72)' } },
      bubbleOther: { value: { _light: '#eef1f6', _dark: '#1d2738' } },
      wave: { value: { _light: 'rgba(58, 123, 181, 0.10)', _dark: 'rgba(91, 143, 196, 0.10)' } },
      ownerBadge: { value: { _light: '{colors.brand.700}', _dark: '{colors.brand.300}' } }
    }
  },
  gradients: {
    // Dark enough at every stop for white text on gradient buttons.
    brand: { value: 'linear-gradient(135deg, #3a7bb5 0%, #2c6496 50%, #1f4e79 100%)' },
    brandSoft: { value: 'linear-gradient(135deg, rgba(58,123,181,.16) 0%, rgba(31,78,121,.16) 100%)' }
  },
  shadows: {
    card: { value: { _light: '0 1px 2px rgba(15,23,42,.06), 0 8px 24px rgba(15,23,42,.06)', _dark: '0 1px 2px rgba(0,0,0,.4), 0 8px 24px rgba(0,0,0,.35)' } },
    glow: { value: '0 8px 30px rgba(58, 123, 181, 0.35)' }
  }
})
