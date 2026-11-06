import { Box, Text } from '@chakra-ui/react'
import type { ReplyQuoteProps } from '@/interfaces/components/chat/thread/reply-quote-props.interface'

/** The message being answered, quoted above the reply. */
export function ReplyQuote({ reply, isMine }: ReplyQuoteProps) {
  return (
    <Box borderStartWidth="3px" borderColor={isMine ? 'whiteAlpha.700' : 'brand.solid'} ps="2.5" mb="1.5" opacity={0.85}>
      <Text fontSize="xs" fontWeight="bold">
        {reply.senderUserName}
      </Text>
      <Text fontSize="xs" lineClamp={2}>
        {reply.preview}
      </Text>
    </Box>
  )
}
