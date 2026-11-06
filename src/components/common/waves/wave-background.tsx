import { Box } from '@chakra-ui/react'
import { WAVE_LAYERS } from '@/constants/common/wave.constants'
import { WaveLayer } from './wave-layer'

/** The brand's layered ocean waves along the bottom of the screen, behind all content. */
export function WaveBackground() {
  return (
    <Box aria-hidden position="fixed" inset="0" pointerEvents="none" zIndex="0" overflow="hidden">
      <Box position="absolute" inset="0" bgImage="radial-gradient(60rem 30rem at 10% -10%, {colors.app.wave}, transparent)" />
      {WAVE_LAYERS.map((layer) => (
        <WaveLayer key={`${layer.color}-${layer.height}`} {...layer} />
      ))}
    </Box>
  )
}
