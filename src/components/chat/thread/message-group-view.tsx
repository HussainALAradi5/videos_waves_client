import { HStack, Stack, Text } from '@chakra-ui/react'
import { MessageKind } from '@/enums/chat/message/message-kind.enum'
import type { MessageGroupViewProps } from '@/interfaces/components/chat/thread/message-group-view-props.interface'
import { UserAvatar } from '@/components/common/avatars/user-avatar'
import { DaySeparator } from './day-separator'
import { MessageBubble } from './message-bubble'
import { SystemNotice } from './system-notice'

const positionOf = (index: number, total: number) =>
  total === 1 ? 'single' : index === 0 ? 'first' : index === total - 1 ? 'last' : 'middle'

/** A run of bubbles from one sender; in groups, their name above and avatar beside the last bubble. */
export function MessageGroupView({ group, showSender, members, onReply }: MessageGroupViewProps) {
  const first = group.messages[0]
  return (
    <Stack gap="1">
      {group.dayLabel && <DaySeparator label={group.dayLabel} />}
      {first.kind === MessageKind.SYSTEM ? (
        <SystemNotice message={first} />
      ) : (
        <HStack align="flex-end" gap="2" justify={group.isMine ? 'flex-end' : 'flex-start'}>
          {!group.isMine && showSender && <UserAvatar user={first.sender} size="xs" />}
          <Stack gap="0.5" flex="1" align={group.isMine ? 'flex-end' : 'flex-start'}>
            {!group.isMine && showSender && (
              <Text fontSize="xs" color="fg.muted" ps="3">
                {first.sender.userName}
              </Text>
            )}
            {group.messages.map((message, index) => (
              <MessageBubble key={message.id} message={message} isMine={group.isMine} position={positionOf(index, group.messages.length)} members={members} onReply={onReply} />
            ))}
          </Stack>
        </HStack>
      )}
    </Stack>
  )
}
