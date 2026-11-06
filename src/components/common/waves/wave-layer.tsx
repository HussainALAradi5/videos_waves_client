'use client'

import { useId } from 'react'
import { Box, chakra } from '@chakra-ui/react'
import { WAVE_GRADIENT_STOPS, WAVE_PATH, WAVE_VIEWBOX } from '@/constants/common/wave.constants'
import type { WaveLayerProps } from '@/interfaces/components/common/waves/wave-layer-props.interface'

const Svg = chakra('svg')

/**
 * One wave strip that drifts sideways and rolls (rises, stretches, settles) on its own beat.
 * CSS-only, so it costs nothing on the main thread; still for people who ask for reduced motion.
 */
export function WaveLayer({ color, opacity, duration, height, isReversed, rollDelay = '0s', hasGradient = false }: WaveLayerProps) {
  const gradientId = useId()
  return (
    <Box
      position="absolute"
      insetX="0"
      bottom="0"
      height={height}
      overflow="hidden"
      opacity={opacity}
      transformOrigin="bottom"
      animation={`waveRoll {durations.swell} ease-in-out ${rollDelay} infinite`}
      _motionReduce={{ animation: 'none' }}
    >
      <Svg
        viewBox={WAVE_VIEWBOX}
        preserveAspectRatio="none"
        width="200%"
        height="full"
        color={color}
        animation={`waveDrift {durations.${duration}} linear infinite${isReversed ? ' reverse' : ''}`}
        _motionReduce={{ animation: 'none' }}
      >
        {hasGradient && (
          <defs>
            <linearGradient id={gradientId} x1="0" x2="1" y1="0" y2="0">
              {WAVE_GRADIENT_STOPS.map((stop) => (
                <stop key={stop.offset} offset={stop.offset} style={{ stopColor: stop.color }} />
              ))}
            </linearGradient>
          </defs>
        )}
        <path d={WAVE_PATH} fill={hasGradient ? `url(#${gradientId})` : 'currentColor'} />
      </Svg>
    </Box>
  )
}
