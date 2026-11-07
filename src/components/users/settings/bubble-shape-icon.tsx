import { Box, HStack } from '@chakra-ui/react'
import { BUBBLE_SHAPE_ICON_CORNERS } from '@/constants/chat/bubble-shape-icon.constants'
import { BubbleStyle } from '@/enums/users/settings/bubble-style.enum'
import type { BubbleShapeIconProps } from '@/interfaces/components/users/settings/bubble-shape-icon-props.interface'

/** Two tiny bubbles (theirs grey, yours blue) in the given shape, so each choice shows what it looks like. */
export function BubbleShapeIcon({ shape }: BubbleShapeIconProps) {
  const corners = BUBBLE_SHAPE_ICON_CORNERS[shape]
  const isMinimal = shape === BubbleStyle.MINIMAL
  return (
    <HStack gap="1" align="flex-end" aria-hidden flexShrink={0}>
      <Box w="4" h="3" borderRadius={corners.theirs} bg={isMinimal ? 'transparent' : 'app.bubbleOther'} borderWidth={isMinimal ? '1.5px' : '0'} borderColor="fg.muted" />
      <Box w="4" h="3" mb="1" borderRadius={corners.mine} bg={isMinimal ? 'brand.subtle' : 'brand.solid'} borderWidth={isMinimal ? '1.5px' : '0'} borderColor="brand.solid" />
    </HStack>
  )
}
