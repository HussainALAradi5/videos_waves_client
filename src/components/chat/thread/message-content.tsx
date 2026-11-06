import { Stack, Text } from '@chakra-ui/react'
import { CHAT_MESSAGES } from '@/constants/chat/chat-messages.constants'
import { MessageKind } from '@/enums/chat/message/message-kind.enum'
import type { MessageContentProps } from '@/interfaces/components/chat/thread/message-content-props.interface'
import { MessageAttachments } from './message-attachments'
import { SharedVideoCard } from './shared-video-card'
import { VoiceNotePlayer } from './voice-note-player'

/** What a message carries: text, attachments, a voice note, or a shared video. */
export function MessageContent({ message, isMine }: MessageContentProps) {
  if (message.isUnsent) return <Text fontSize="sm">{CHAT_MESSAGES.UNSENT}</Text>
  const voice = message.kind === MessageKind.VOICE ? message.attachments[0] : undefined
  return (
    <Stack gap="2">
      {voice && <VoiceNotePlayer src={voice.url} durationSeconds={voice.durationSeconds} isMine={isMine} />}
      {!voice && message.attachments.length > 0 && <MessageAttachments attachments={message.attachments} />}
      {message.sharedVideo && <SharedVideoCard video={message.sharedVideo} />}
      {message.body && (
        <Text whiteSpace="pre-wrap" wordBreak="break-word">
          {message.body}
        </Text>
      )}
    </Stack>
  )
}
