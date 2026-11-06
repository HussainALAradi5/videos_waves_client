'use client'

import { HStack, Stack, Text } from '@chakra-ui/react'
import { CHAT_MESSAGES } from '@/constants/chat/chat-messages.constants'
import type { RequestBannerProps } from '@/interfaces/components/chat/thread/request-banner-props.interface'
import { useConversationActions } from '@/hooks/chat/conversation/use-conversation-actions'
import { conversationTitle, directPartner } from '@/utilities/chat/conversation-display.utility'
import { GenericButton } from '@/components/common/buttons/generic-button'
import { Animated } from '@/components/common/motion/animated'

/** A message request: accept to reply, delete it, or block the sender. */
export function RequestBanner({ conversation }: RequestBannerProps) {
  const actions = useConversationActions(conversation.id)
  const partner = directPartner(conversation)
  return (
    <Animated variant="fadeUp">
      <Stack gap="3" p="5" borderTopWidth="1px" borderColor="app.border" align="center" textAlign="center">
        <Text fontWeight="semibold">{CHAT_MESSAGES.REQUEST_TITLE(conversationTitle(conversation))}</Text>
        <Text fontSize="sm" color="fg.muted">
          {CHAT_MESSAGES.REQUEST_HINT}
        </Text>
        <HStack gap="2">
          {partner && (
            <GenericButton tone="dangerGhost" size="sm" onClick={() => actions.block(partner.user.userName)}>
              {CHAT_MESSAGES.BLOCK}
            </GenericButton>
          )}
          <GenericButton tone="outline" size="sm" onClick={actions.hide}>
            {CHAT_MESSAGES.DELETE}
          </GenericButton>
          <GenericButton tone="gradient" size="sm" onClick={actions.accept}>
            {CHAT_MESSAGES.ACCEPT}
          </GenericButton>
        </HStack>
      </Stack>
    </Animated>
  )
}
