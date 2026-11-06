'use client'

import { Box, HStack, IconButton, Text } from '@chakra-ui/react'
import { LuPause, LuPlay } from 'react-icons/lu'
import { CHAT_MESSAGES } from '@/constants/chat/chat-messages.constants'
import type { VoiceNotePlayerProps } from '@/interfaces/components/chat/thread/voice-note-player-props.interface'
import { useAudioPlayer } from '@/hooks/chat/message/use-audio-player'
import { formatDuration } from '@/utilities/format/duration-format.utility'

const BARS = [6, 12, 18, 10, 16, 8, 14, 20, 12, 7, 15, 9, 18, 11, 6]

/** A voice message: play button and a waveform that fills as it plays. */
export function VoiceNotePlayer({ src, durationSeconds, isMine }: VoiceNotePlayerProps) {
  const { audioRef, isPlaying, progress, toggle } = useAudioPlayer()
  const color = isMine ? 'white' : 'fg'
  return (
    <HStack gap="3" minW="48">
      <IconButton aria-label={CHAT_MESSAGES.VOICE_MESSAGE} size="sm" rounded="full" variant="subtle" onClick={toggle}>
        {isPlaying ? <LuPause /> : <LuPlay />}
      </IconButton>
      <HStack gap="0.5" align="center" flex="1" height="6">
        {BARS.map((height, index) => (
          <Box key={index} width="1" height={`${height}px`} rounded="full" bg={color} opacity={(index / BARS.length) * 100 < progress ? 1 : 0.35} transition="opacity 0.15s" />
        ))}
      </HStack>
      <Text fontSize="xs" color={color}>
        {formatDuration(durationSeconds) ?? ''}
      </Text>
      <audio ref={audioRef} src={src} preload="metadata" />
    </HStack>
  )
}
