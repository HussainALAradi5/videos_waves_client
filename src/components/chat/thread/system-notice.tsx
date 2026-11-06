import { Text } from '@chakra-ui/react'
import { SYSTEM_NOTICES } from '@/constants/chat/chat-messages.constants'
import type { SystemNoticeProps } from '@/interfaces/components/chat/thread/system-notice-props.interface'

/** "ana added ben" and other group notices, centered between messages. */
export function SystemNotice({ message }: SystemNoticeProps) {
  if (!message.systemAction) return null
  const text = SYSTEM_NOTICES[message.systemAction](message.sender.userName, message.systemTarget?.userName ?? '')
  return (
    <Text textAlign="center" fontSize="xs" color="fg.muted" py="1">
      {text}
    </Text>
  )
}
