import { Box, chakra } from '@chakra-ui/react'
import { WAVE_PATH, WAVE_VIEWBOX } from '@/constants/common/wave.constants'

const Svg = chakra('svg')

/** A rounded tile with a wave rolling through it: the app icon. */
export function WaveMark() {
  return (
    <Box position="relative" boxSize="9" rounded="xl" bgImage="{gradients.brand}" overflow="hidden" shadow="glow" flexShrink={0}>
      <Svg
        viewBox={WAVE_VIEWBOX}
        preserveAspectRatio="none"
        position="absolute"
        bottom="0"
        width="200%"
        height="55%"
        color="whiteAlpha.700"
        animation="waveDrift 4s linear infinite"
      >
        <path d={WAVE_PATH} fill="currentColor" />
      </Svg>
    </Box>
  )
}
