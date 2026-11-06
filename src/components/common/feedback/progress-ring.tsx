import { AbsoluteCenter, ProgressCircle } from '@chakra-ui/react'
import type { ProgressRingProps } from '@/interfaces/components/common/feedback/progress-ring-props.interface'

/** Circular progress with the percentage inside, for file tiles. */
export function ProgressRing({ value, size = 'md' }: ProgressRingProps) {
  return (
    <ProgressCircle.Root value={value} size={size} colorPalette="brand">
      <ProgressCircle.Circle>
        <ProgressCircle.Track />
        <ProgressCircle.Range strokeLinecap="round" />
      </ProgressCircle.Circle>
      <AbsoluteCenter>
        <ProgressCircle.ValueText fontSize="2xs" color="white" />
      </AbsoluteCenter>
    </ProgressCircle.Root>
  )
}
