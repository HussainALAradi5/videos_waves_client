'use client'

import { useState, type KeyboardEvent, type MouseEvent } from 'react'
import { Box, HStack, Stack, Text } from '@chakra-ui/react'
import { CHAT_MESSAGES } from '@/constants/chat/chat-messages.constants'
import { CHAT_LIMITS } from '@/constants/chat/chat.constants'
import { BUBBLE_CORNERS } from '@/constants/chat/bubble.constants'
import { MESSAGES } from '@/constants/common/messages.constants'
import type { MessageBubbleProps } from '@/interfaces/components/chat/thread/message-bubble-props.interface'
import { useMessageActions } from '@/hooks/chat/message/use-message-actions'
import { useSettings } from '@/hooks/users/settings/use-settings'
import { bubbleLook } from '@/utilities/chat/bubble-look.utility'
import { countSeenBy, readStateOf } from '@/utilities/chat/seen.utility'
import { InlineEditor } from '@/components/common/forms/inline-editor'
import { Animated } from '@/components/common/motion/animated'
import { MessageContent } from './message-content'
import { MessageTicks } from './message-ticks'
import { MessageToolbar } from './message-toolbar'
import { ReactionPills } from './reaction-pills'
import { ReplyQuote } from './reply-quote'

/** One message in your chosen shape and colours; right-click (or Shift+F10) opens the reaction bar, actions appear on hover. */
export function MessageBubble({ message, isMine, position, members, onReply }: MessageBubbleProps) {
  const { bubbleStyle, bubbleColor, othersBubbleColor } = useSettings()
  const actions = useMessageActions(message)
  const [isEditing, setIsEditing] = useState(false)
  const [isPickerOpen, setIsPickerOpen] = useState(false)
  const canReact = !message.isUnsent && !isEditing
  const look = bubbleLook({ isMine, isUnsent: message.isUnsent, style: bubbleStyle, myColor: bubbleColor, othersColor: othersBubbleColor })

  const openPicker = (event: MouseEvent | KeyboardEvent) => {
    if (!canReact) return
    event.preventDefault()
    setIsPickerOpen(true)
  }
  const onKeyDown = (event: KeyboardEvent) => {
    if (event.key === 'ContextMenu' || (event.shiftKey && event.key === 'F10')) openPicker(event)
  }

  return (
    <Animated variant={isMine ? 'slideFromRight' : 'fadeUp'} isLayout>
      <Stack gap="0" align={isMine ? 'flex-end' : 'flex-start'} className="group">
        <HStack gap="1.5" flexDirection={isMine ? 'row-reverse' : 'row'} maxW="min(32rem, 85%)">
          <Box
            px="3.5"
            py="2"
            borderRadius={BUBBLE_CORNERS[bubbleStyle][isMine ? 'mine' : 'theirs'][position]}
            fontStyle={message.isUnsent ? 'italic' : undefined}
            tabIndex={canReact ? 0 : undefined}
            title={canReact ? CHAT_MESSAGES.REACT_HINT : undefined}
            onContextMenu={openPicker}
            onKeyDown={onKeyDown}
            outline="none"
            _focusVisible={{ boxShadow: '0 0 0 2px var(--chakra-colors-brand-focus-ring)' }}
            {...look}
          >
            {message.replyTo && <ReplyQuote reply={message.replyTo} isMine={isMine} />}
            {isEditing ? (
              <InlineEditor
                initialValue={message.body ?? ''}
                maxLength={CHAT_LIMITS.BODY_MAX}
                onSave={async (body) => {
                  await actions.edit(body)
                  setIsEditing(false)
                }}
                onCancel={() => setIsEditing(false)}
                saveLabel={MESSAGES.COMMON.SAVE}
                cancelLabel={MESSAGES.COMMON.CANCEL}
              />
            ) : (
              <MessageContent message={message} isMine={isMine} />
            )}
          </Box>
          {canReact && (
            <MessageToolbar
              message={message}
              isMine={isMine}
              isSeen={countSeenBy(message, members) > 0}
              actions={actions}
              isPickerOpen={isPickerOpen}
              onPickerOpenChange={setIsPickerOpen}
              onReply={() => onReply(message)}
              onEdit={() => setIsEditing(true)}
            />
          )}
        </HStack>
        <ReactionPills reactions={message.reactions} myReaction={message.myReaction} onReact={actions.react} isMine={isMine} />
        {(isMine || message.isEdited) && !message.isUnsent && (
          <HStack gap="1" px="2">
            {message.isEdited && (
              <Text fontSize="2xs" color="fg.muted">
                {CHAT_MESSAGES.EDITED}
              </Text>
            )}
            {isMine && <MessageTicks state={readStateOf(message, members)} />}
          </HStack>
        )}
      </Stack>
    </Animated>
  )
}
