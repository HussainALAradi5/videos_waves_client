import { HStack, Text } from '@chakra-ui/react'
import { LuClapperboard } from 'react-icons/lu'
import { CHAT_MESSAGES } from '@/constants/chat/chat-messages.constants'

/** Shown while a video from the feed is waiting to be sent in this chat. */
export function SharedVideoChip() {
  return (
    <HStack gap="2" px="3" py="2" rounded="xl" bg="brand.subtle" color="brand.fg" fontSize="sm">
      <LuClapperboard />
      <Text>{CHAT_MESSAGES.SHARE_THIS_VIDEO}</Text>
    </HStack>
  )
}
