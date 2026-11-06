'use client'

import { Box, HStack } from '@chakra-ui/react'
import { BUBBLE_BACKGROUNDS } from '@/constants/users/settings/settings.constants'
import { PRESS } from '@/constants/common/motion.constants'
import type { BubbleColor } from '@/enums/users/settings/bubble-color.enum'
import type { BubbleSwatchesProps } from '@/interfaces/components/users/settings/bubble-swatches-props.interface'
import { MotionBox } from '@/components/common/motion/motion-box'

/** Round colour samples for the chat bubble colour; the chosen one has a ring. */
export function BubbleSwatches({ options, value, onChange }: BubbleSwatchesProps) {
  return (
    <HStack gap="2" role="radiogroup">
      {options.map((option) => (
        <MotionBox key={option.value} whileTap={PRESS.whileTap} whileHover={{ scale: 1.08 }}>
          <Box
            as="button"
            role="radio"
            aria-checked={value === option.value}
            aria-label={option.label}
            onClick={() => onChange(option.value)}
            boxSize="8"
            rounded="full"
            bgImage={BUBBLE_BACKGROUNDS[option.value as BubbleColor]}
            outline={value === option.value ? '2px solid' : 'none'}
            outlineColor="brand.solid"
            outlineOffset="2px"
          />
        </MotionBox>
      ))}
    </HStack>
  )
}
