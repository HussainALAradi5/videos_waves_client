'use client'

import { Box, HStack, Text } from '@chakra-ui/react'
import { LuMic, LuSend, LuTrash2 } from 'react-icons/lu'
import { CHAT_MESSAGES } from '@/constants/chat/chat-messages.constants'
import type { VoiceRecordButtonProps } from '@/interfaces/components/chat/composer/voice-record-button-props.interface'
import { useVoiceRecorder } from '@/hooks/chat/message/use-voice-recorder'
import { formatDuration } from '@/utilities/format/duration-format.utility'
import { GenericIconButton } from '@/components/common/buttons/generic-icon-button'
import { WaveLoader } from '@/components/common/waves/wave-loader'

/** Tap to record; while recording, a live wave and timer with cancel and send. */
export function VoiceRecordButton({ onRecorded }: VoiceRecordButtonProps) {
  const recorder = useVoiceRecorder(onRecorded)
  if (!recorder.isRecording) {
    return (
      <Box>
        <GenericIconButton label={recorder.error ?? CHAT_MESSAGES.RECORD} onClick={recorder.start} tone={recorder.error ? 'dangerGhost' : 'ghost'}>
          <LuMic />
        </GenericIconButton>
      </Box>
    )
  }
  return (
    <HStack gap="2">
      <GenericIconButton label={CHAT_MESSAGES.CANCEL_RECORDING} tone="dangerGhost" onClick={recorder.cancel}>
        <LuTrash2 />
      </GenericIconButton>
      <WaveLoader label={CHAT_MESSAGES.RECORD} size="sm" />
      <Text fontSize="sm" fontVariantNumeric="tabular-nums" color="fg.error">
        {formatDuration(recorder.elapsedSeconds)}
      </Text>
      <GenericIconButton label={CHAT_MESSAGES.STOP_RECORDING} tone="gradient" onClick={recorder.stop}>
        <LuSend />
      </GenericIconButton>
    </HStack>
  )
}
