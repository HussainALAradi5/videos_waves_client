import { Box, chakra } from '@chakra-ui/react'
import { WAVE_PATH, WAVE_VIEWBOX } from '@/constants/common/wave.constants'
import type { WaveLayerProps } from '@/interfaces/components/common/waves/wave-layer-props.interface'

const Svg = chakra('svg')

/** One drifting wave strip; CSS-only, so it costs nothing on the main thread. */
export function WaveLayer({ color, opacity, duration, height, isReversed }: WaveLayerProps) {
  return (
    <Box position="absolute" insetX="0" bottom="0" height={height} overflow="hidden" opacity={opacity}>
      <Svg
        viewBox={WAVE_VIEWBOX}
        preserveAspectRatio="none"
        width="200%"
        height="full"
        color={color}
        animation={`waveDrift {durations.${duration}} linear infinite${isReversed ? ' reverse' : ''}`}
      >
        <path d={WAVE_PATH} fill="currentColor" />
      </Svg>
    </Box>
  )
}
