import { Box, chakra } from '@chakra-ui/react'
import { WAVE_MARK_LAYERS, WAVE_PATH, WAVE_VIEWBOX } from '@/constants/common/wave.constants'

const Svg = chakra('svg')

/** The app icon: a gradient tile with three layers of sea rolling and swelling at their own pace. */
export function WaveMark() {
  return (
    <Box position="relative" boxSize="9" rounded="xl" bgImage="{gradients.brand}" overflow="hidden" shadow="glow" flexShrink={0} aria-hidden>
      {WAVE_MARK_LAYERS.map((layer) => (
        <Box
          key={layer.height}
          position="absolute"
          insetX="0"
          bottom="-8%"
          height={layer.height}
          opacity={layer.opacity}
          animation={`waveSwell ${layer.swell} ease-in-out ${layer.delay} infinite`}
          _motionReduce={{ animation: 'none' }}
        >
          <Svg
            viewBox={WAVE_VIEWBOX}
            preserveAspectRatio="none"
            width="200%"
            height="full"
            color="white"
            animation={`waveDrift ${layer.drift} linear infinite${layer.isReversed ? ' reverse' : ''}`}
            _motionReduce={{ animation: 'none' }}
          >
            <path d={WAVE_PATH} fill="currentColor" />
          </Svg>
        </Box>
      ))}
    </Box>
  )
}
