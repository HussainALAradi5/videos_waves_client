'use client'

import { useState } from 'react'
import { Box, HStack, Stack, Text } from '@chakra-ui/react'
import { CHAT_MESSAGES } from '@/constants/chat/chat-messages.constants'
import { CHAT_LIMITS } from '@/constants/chat/chat.constants'
import { BUBBLE_CORNERS } from '@/constants/chat/bubble.constants'
import { MESSAGES } from '@/constants/common/messages.constants'
import { BUBBLE_BACKGROUNDS } from '@/constants/users/settings/settings.constants'
import type { MessageBubbleProps } from '@/interfaces/components/chat/thread/message-bubble-props.interface'
import { useMessageActions } from '@/hooks/chat/message/use-message-actions'
import { useSettings } from '@/hooks/users/settings/use-settings'
import { InlineEditor } from '@/components/common/forms/inline-editor'
import { Animated } from '@/components/common/motion/animated'
import { MessageContent } from './message-content'
import { MessageToolbar } from './message-toolbar'
import { ReactionPills } from './reaction-pills'
import { ReplyQuote } from './reply-quote'

/** One message: your bubbles use your chosen colour, theirs a soft grey; actions appear on hover. */
export function MessageBubble({ message, isMine, position, onReply }: MessageBubbleProps) {
  const { bubbleColor } = useSettings()
  const actions = useMessageActions(message)
  const [isEditing, setIsEditing] = useState(false)
  const corners = BUBBLE_CORNERS[isMine ? 'mine' : 'theirs'][position]

  return (
    <Animated variant={isMine ? 'slideFromRight' : 'fadeUp'} isLayout>
      <Stack gap="0" align={isMine ? 'flex-end' : 'flex-start'} className="group">
        <HStack gap="1.5" flexDirection={isMine ? 'row-reverse' : 'row'} maxW="min(32rem, 85%)">
          <Box
            px="3.5"
            py="2"
            borderRadius={corners}
            bgImage={isMine && !message.isUnsent ? BUBBLE_BACKGROUNDS[bubbleColor] : undefined}
            bg={isMine ? (message.isUnsent ? 'bg.muted' : undefined) : 'app.bubbleOther'}
            color={isMine && !message.isUnsent ? 'white' : 'fg'}
            fontStyle={message.isUnsent ? 'italic' : undefined}
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
          {!message.isUnsent && !isEditing && (
            <MessageToolbar message={message} isMine={isMine} actions={actions} onReply={() => onReply(message)} onEdit={() => setIsEditing(true)} />
          )}
        </HStack>
        <ReactionPills reactions={message.reactions} myReaction={message.myReaction} onReact={actions.react} isMine={isMine} />
        {message.isEdited && !message.isUnsent && (
          <Text fontSize="2xs" color="fg.muted" px="2">
            {CHAT_MESSAGES.EDITED}
          </Text>
        )}
      </Stack>
    </Animated>
  )
}
