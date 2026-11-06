'use client'

import { Box, SimpleGrid, Text } from '@chakra-ui/react'
import { CHAT_BACKGROUNDS } from '@/constants/chat/chat-background.constants'
import { CHAT_MESSAGES } from '@/constants/chat/chat-messages.constants'
import { PRESS } from '@/constants/common/motion.constants'
import type { ChatBackground } from '@/enums/chat/conversation/chat-background.enum'
import type { ChatBackgroundDialogProps } from '@/interfaces/components/chat/options/chat-background-dialog-props.interface'
import { GenericModal } from '@/components/common/dialogs/generic-modal'
import { MotionBox } from '@/components/common/motion/motion-box'

/** A grid of wallpapers for this chat; the chosen one has a ring and saving is instant. */
export function ChatBackgroundDialog({ options }: ChatBackgroundDialogProps) {
  return (
    <GenericModal isOpen={options.pending === 'background'} onClose={options.cancel} title={CHAT_MESSAGES.BACKGROUND} description={CHAT_MESSAGES.BACKGROUND_HINT}>
      <SimpleGrid columns={{ base: 3, sm: 4 }} gap="3" role="radiogroup" aria-label={CHAT_MESSAGES.BACKGROUND}>
        {(Object.entries(CHAT_BACKGROUNDS) as [ChatBackground, (typeof CHAT_BACKGROUNDS)[ChatBackground]][]).map(([value, look]) => {
          const isChosen = options.background === value
          return (
            <MotionBox key={value} whileHover={{ y: -2 }} whileTap={PRESS.whileTap}>
              <Box
                as="button"
                role="radio"
                aria-checked={isChosen}
                onClick={() => void options.setBackground(value)}
                width="full"
                aspectRatio="3 / 4"
                rounded="xl"
                bg="app.canvas"
                bgImage={look.image}
                bgSize={look.size}
                borderWidth="1px"
                borderColor="app.border"
                outline={isChosen ? '2px solid' : 'none'}
                outlineColor="brand.solid"
                outlineOffset="2px"
                display="flex"
                alignItems="flex-end"
                p="2"
              >
                <Text fontSize="xs" fontWeight="medium" bg="app.glass" px="2" py="0.5" rounded="full">
                  {look.label}
                </Text>
              </Box>
            </MotionBox>
          )
        })}
      </SimpleGrid>
    </GenericModal>
  )
}
