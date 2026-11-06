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
      // Dark: layered blue-black surfaces (not flat black), each step a little lighter, with hairline borders.
      canvas: { value: { _light: '#f6f8fb', _dark: '#080c14' } },
      surface: { value: { _light: 'white', _dark: '#0e1420' } },
      surfaceRaised: { value: { _light: 'white', _dark: '#141c2b' } },
      surfaceHover: { value: { _light: '#f1f4f9', _dark: '#1a2335' } },
      border: { value: { _light: 'rgba(15, 23, 42, 0.08)', _dark: 'rgba(148, 170, 200, 0.12)' } },
      glass: { value: { _light: 'rgba(255, 255, 255, 0.72)', _dark: 'rgba(12, 18, 29, 0.68)' } },
      bubbleOther: { value: { _light: '#eef1f6', _dark: '#1a2436' } },
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
    card: {
      value: {
        _light: '0 1px 2px rgba(15,23,42,.06), 0 8px 24px rgba(15,23,42,.06)',
        // A faint top highlight lifts cards off the dark canvas the way light does on glass.
        _dark: 'inset 0 1px 0 rgba(255,255,255,.04), 0 1px 2px rgba(0,0,0,.5), 0 12px 32px rgba(0,0,0,.45)'
      }
    },
    toast: {
      value: {
        _light: '0 10px 30px rgba(15,23,42,.14), 0 2px 6px rgba(15,23,42,.08)',
        _dark: 'inset 0 1px 0 rgba(255,255,255,.05), 0 16px 40px rgba(0,0,0,.6)'
      }
    },
    glow: { value: '0 8px 30px rgba(58, 123, 181, 0.35)' }
  }
})
