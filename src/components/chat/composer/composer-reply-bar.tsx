import { HStack, Stack, Text } from '@chakra-ui/react'
import { LuX } from 'react-icons/lu'
import { CHAT_MESSAGES } from '@/constants/chat/chat-messages.constants'
import { MESSAGES } from '@/constants/common/messages.constants'
import type { ComposerReplyBarProps } from '@/interfaces/components/chat/composer/composer-reply-bar-props.interface'
import { GenericIconButton } from '@/components/common/buttons/generic-icon-button'
import { Animated } from '@/components/common/motion/animated'

export function ComposerReplyBar({ message, onCancel }: ComposerReplyBarProps) {
  return (
    <Animated variant="collapse">
      <HStack gap="3" ps="3" borderStartWidth="3px" borderColor="brand.solid">
        <Stack gap="0" flex="1" minW="0">
          <Text fontSize="xs" fontWeight="bold">
            {CHAT_MESSAGES.REPLYING_TO(message.sender.userName)}
          </Text>
          <Text fontSize="xs" color="fg.muted" truncate>
            {message.body ?? CHAT_MESSAGES.VOICE_MESSAGE}
          </Text>
        </Stack>
        <GenericIconButton label={MESSAGES.COMMON.CANCEL} size="xs" onClick={onCancel}>
          <LuX />
        </GenericIconButton>
      </HStack>
    </Animated>
  )
}
