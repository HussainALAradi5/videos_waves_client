'use client'

import { Box, HStack } from '@chakra-ui/react'
import { AnimatePresence } from 'motion/react'
import { CHAT_MESSAGES } from '@/constants/chat/chat-messages.constants'
import type { TypingIndicatorProps } from '@/interfaces/components/chat/thread/typing-indicator-props.interface'
import { Animated } from '@/components/common/motion/animated'

const DOTS = [0, 1, 2]
const DOT_DELAY_S = 0.15

/** Three bouncing dots in a bubble while someone types. */
export function TypingIndicator({ isVisible }: TypingIndicatorProps) {
  return (
    <AnimatePresence>
      {isVisible && (
        <Animated variant="scaleIn" alignSelf="flex-start">
          <HStack gap="1" px="4" py="3" rounded="bubble" bg="app.bubbleOther" aria-label={CHAT_MESSAGES.SOMEONE_TYPING}>
            {DOTS.map((dot) => (
              <Box key={dot} boxSize="1.5" rounded="full" bg="fg.muted" animation="typingDot 1.2s ease-in-out infinite" style={{ animationDelay: `${dot * DOT_DELAY_S}s` }} />
            ))}
          </HStack>
        </Animated>
      )}
    </AnimatePresence>
  )
}
