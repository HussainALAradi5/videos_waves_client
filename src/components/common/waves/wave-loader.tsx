import { HStack, Box, VisuallyHidden } from '@chakra-ui/react'
import { WAVE_LOADER_BARS } from '@/constants/common/wave.constants'
import { WAVE_LOADER_SIZES } from '@/constants/common/wave-loader.constants'
import type { WaveLoaderProps } from '@/interfaces/components/common/waves/wave-loader-props.interface'

const BAR_DELAY_S = 0.12

/** Bars rising and falling like a wave: the app's loading indicator. */
export function WaveLoader({ label, size = 'md' }: WaveLoaderProps) {
  const dimensions = WAVE_LOADER_SIZES[size]
  return (
    <HStack role="status" gap={dimensions.gap} align="center" height={dimensions.height}>
      {Array.from({ length: WAVE_LOADER_BARS }, (_, index) => (
        <Box
          key={index}
          width={dimensions.width}
          height="full"
          rounded="full"
          bgImage="{gradients.brand}"
          transformOrigin="bottom"
          animation="waveBob 0.9s ease-in-out infinite"
          style={{ animationDelay: `${index * BAR_DELAY_S}s` }}
        />
      ))}
      <VisuallyHidden>{label}</VisuallyHidden>
    </HStack>
  )
}
