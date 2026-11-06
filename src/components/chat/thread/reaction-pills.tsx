'use client'

import { HStack, Text } from '@chakra-ui/react'
import { AnimatePresence } from 'motion/react'
import type { ReactionPillsProps } from '@/interfaces/components/chat/thread/reaction-pills-props.interface'
import { Animated } from '@/components/common/motion/animated'

/** Reaction counts hanging off the bubble; tap your own to take it back. */
export function ReactionPills({ reactions, myReaction, onReact, isMine }: ReactionPillsProps) {
  if (reactions.length === 0) return null
  return (
    <HStack gap="1" mt="-2" justify={isMine ? 'flex-end' : 'flex-start'} px="2" position="relative" zIndex="1">
      <AnimatePresence initial={false}>
        {reactions.map((reaction) => (
          <Animated key={reaction.emoji} variant="scaleIn">
            <HStack
              as="button"
              gap="1"
              px="2"
              py="0.5"
              rounded="full"
              bg="app.surfaceRaised"
              borderWidth="1px"
              borderColor={myReaction === reaction.emoji ? 'brand.solid' : 'app.border'}
              shadow="sm"
              onClick={() => onReact(reaction.emoji)}
            >
              <Text fontSize="sm">{reaction.emoji}</Text>
              {reaction.count > 1 && <Text fontSize="xs">{reaction.count}</Text>}
            </HStack>
          </Animated>
        ))}
      </AnimatePresence>
    </HStack>
  )
}
