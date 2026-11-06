'use client'

import { HStack, Popover, Portal } from '@chakra-ui/react'
import { LuSmilePlus } from 'react-icons/lu'
import { CHAT_MESSAGES } from '@/constants/chat/chat-messages.constants'
import { REACTION_EMOJIS } from '@/constants/chat/chat.constants'
import type { ReactionPickerProps } from '@/interfaces/components/chat/thread/reaction-picker-props.interface'
import { GenericIconButton } from '@/components/common/buttons/generic-icon-button'
import { MotionBox } from '@/components/common/motion/motion-box'

/** The quick emoji bar (the button, or right-click on the message); each emoji pops on hover, and picking one closes it. */
export function ReactionPicker({ myReaction, onReact, isOpen, onOpenChange }: ReactionPickerProps) {
  return (
    <Popover.Root positioning={{ placement: 'top' }} open={isOpen} onOpenChange={(details) => onOpenChange(details.open)}>
      <Popover.Trigger asChild>
        <GenericIconButton label={CHAT_MESSAGES.REACT} size="xs">
          <LuSmilePlus />
        </GenericIconButton>
      </Popover.Trigger>
      <Portal>
        <Popover.Positioner>
          <Popover.Content width="auto" rounded="full" px="2" py="1">
            <HStack gap="0.5">
              {REACTION_EMOJIS.map((emoji) => (
                <MotionBox
                  key={emoji}
                  as="button"
                  fontSize="xl"
                  px="1"
                  rounded="full"
                  bg={myReaction === emoji ? 'brand.subtle' : 'transparent'}
                  whileHover={{ scale: 1.35, y: -3 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => {
                    onOpenChange(false)
                    onReact(emoji)
                  }}
                  aria-label={emoji}
                >
                  {emoji}
                </MotionBox>
              ))}
            </HStack>
          </Popover.Content>
        </Popover.Positioner>
      </Portal>
    </Popover.Root>
  )
}
