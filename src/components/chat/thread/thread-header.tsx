'use client'

import NextLink from 'next/link'
import { Box, HStack, Stack, Text } from '@chakra-ui/react'
import { LuArrowLeft, LuInfo, LuUsers } from 'react-icons/lu'
import { CHAT_MESSAGES } from '@/constants/chat/chat-messages.constants'
import { PAGE_ROUTES } from '@/constants/common/routes.constants'
import type { ThreadHeaderProps } from '@/interfaces/components/chat/thread/thread-header-props.interface'
import { useTypingUsers } from '@/hooks/chat/realtime/use-typing-users'
import { conversationTitle, directPartner } from '@/utilities/chat/conversation-display.utility'
import { UserAvatar } from '@/components/common/avatars/user-avatar'
import { GenericIconButton } from '@/components/common/buttons/generic-icon-button'

/** Back (phones), who you are talking to, their status or typing, and the details button. */
export function ThreadHeader({ conversation, onOpenInfo }: ThreadHeaderProps) {
  const partner = directPartner(conversation)
  const typing = useTypingUsers(conversation.id)
  const status = typing.length > 0 ? CHAT_MESSAGES.SOMEONE_TYPING : partner?.isOnline ? CHAT_MESSAGES.ACTIVE_NOW : partner ? null : CHAT_MESSAGES.MEMBERS(conversation.membersCount)

  return (
    <HStack gap="3" px="4" py="3" borderBottomWidth="1px" borderColor="app.border">
      <GenericIconButton label={CHAT_MESSAGES.BACK} asChild hideFrom="lg">
        <NextLink href={PAGE_ROUTES.MESSAGES}>
          <LuArrowLeft />
        </NextLink>
      </GenericIconButton>
      {partner ? (
        <NextLink href={PAGE_ROUTES.profile(partner.user.userName)}>
          <UserAvatar user={partner.user} size="md" isOnline={partner.isOnline} />
        </NextLink>
      ) : (
        <Box boxSize="10" rounded="full" bgImage="{gradients.brand}" display="grid" placeItems="center" color="white">
          <LuUsers />
        </Box>
      )}
      <Stack gap="0" flex="1" minW="0">
        <Text fontWeight="bold" truncate>
          {conversationTitle(conversation)}
        </Text>
        {status && (
          <Text fontSize="xs" color={typing.length > 0 ? 'brand.fg' : 'fg.muted'}>
            {status}
          </Text>
        )}
      </Stack>
      <GenericIconButton label={CHAT_MESSAGES.CHAT_INFO} onClick={onOpenInfo}>
        <LuInfo />
      </GenericIconButton>
    </HStack>
  )
}
