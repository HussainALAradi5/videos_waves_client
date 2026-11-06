import { Badge } from '@chakra-ui/react'
import { LuShieldCheck } from 'react-icons/lu'
import { CHAT_MESSAGES } from '@/constants/chat/chat-messages.constants'

/** The small "Admin" pill beside a group admin's name, in group info and on their messages. */
export function AdminBadge() {
  return (
    <Badge size="xs" rounded="full" variant="subtle" colorPalette="brand" gap="1" px="1.5" fontWeight="semibold" flexShrink={0}>
      <LuShieldCheck />
      {CHAT_MESSAGES.ADMIN}
    </Badge>
  )
}
