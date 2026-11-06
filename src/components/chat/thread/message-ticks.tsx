import { Box, Icon } from '@chakra-ui/react'
import { LuCheck, LuCheckCheck } from 'react-icons/lu'
import { CHAT_MESSAGES } from '@/constants/chat/chat-messages.constants'
import { ReadState } from '@/enums/chat/message/read-state.enum'
import type { MessageTicksProps } from '@/interfaces/components/chat/thread/message-ticks-props.interface'

const LABELS: Record<ReadState, string> = {
  [ReadState.SENT]: CHAT_MESSAGES.TICK_SENT,
  [ReadState.SEEN_BY_SOME]: CHAT_MESSAGES.TICK_SEEN_BY_SOME,
  [ReadState.READ]: CHAT_MESSAGES.TICK_READ
}

/** One grey tick when sent, two when someone saw it, two in the brand colour when everyone read it. */
export function MessageTicks({ state }: MessageTicksProps) {
  return (
    <Box as="span" display="inline-flex" title={LABELS[state]} aria-label={LABELS[state]} role="img">
      <Icon boxSize="3.5" color={state === ReadState.READ ? 'brand.solid' : 'fg.subtle'} transition="color 0.2s">
        {state === ReadState.SENT ? <LuCheck /> : <LuCheckCheck />}
      </Icon>
    </Box>
  )
}
