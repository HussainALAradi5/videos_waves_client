'use client'

import { Box, Stack, Text } from '@chakra-ui/react'
import { BUBBLE_CORNERS, BUBBLE_PREVIEW } from '@/constants/chat/bubble.constants'
import { useSettings } from '@/hooks/users/settings/use-settings'
import { bubbleLook } from '@/utilities/chat/bubble-look.utility'

/** A two-message sample that changes as you pick a shape or colour. */
export function BubblePreview() {
  const { bubbleStyle, bubbleColor, othersBubbleColor } = useSettings()
  const look = (isMine: boolean) => bubbleLook({ isMine, isUnsent: false, style: bubbleStyle, myColor: bubbleColor, othersColor: othersBubbleColor })
  return (
    <Stack gap="2" mt="2" p="4" rounded="xl" bg="app.canvas" borderWidth="1px" borderColor="app.border" aria-label={BUBBLE_PREVIEW.LABEL}>
      <Box alignSelf="flex-start" px="3.5" py="2" maxW="80%" borderRadius={BUBBLE_CORNERS[bubbleStyle].theirs.single} {...look(false)}>
        <Text fontSize="sm">{BUBBLE_PREVIEW.THEIRS}</Text>
      </Box>
      <Box alignSelf="flex-end" px="3.5" py="2" maxW="80%" borderRadius={BUBBLE_CORNERS[bubbleStyle].mine.single} {...look(true)}>
        <Text fontSize="sm">{BUBBLE_PREVIEW.MINE}</Text>
      </Box>
    </Stack>
  )
}
