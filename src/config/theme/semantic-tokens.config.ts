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
      wave: { value: { _light: 'rgba(10, 157, 240, 0.10)', _dark: 'rgba(34, 184, 255, 0.10)' } },
      ownerBadge: { value: { _light: '{colors.violet.600}', _dark: '{colors.violet.400}' } }
    }
  },
  gradients: {
    brand: { value: 'linear-gradient(135deg, #22b8ff 0%, #7b61ff 55%, #ff5c8a 100%)' },
    brandSoft: { value: 'linear-gradient(135deg, rgba(34,184,255,.16) 0%, rgba(123,97,255,.16) 55%, rgba(255,92,138,.16) 100%)' }
  },
  shadows: {
    card: { value: { _light: '0 1px 2px rgba(15,23,42,.06), 0 8px 24px rgba(15,23,42,.06)', _dark: '0 1px 2px rgba(0,0,0,.4), 0 8px 24px rgba(0,0,0,.35)' } },
    glow: { value: '0 8px 30px rgba(34, 184, 255, 0.35)' }
  }
})
