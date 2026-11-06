"use client";

import NextLink from "next/link";
import { Box, HStack, Stack, Text } from "@chakra-ui/react";
import { LuArrowLeft, LuInfo, LuUsers } from "react-icons/lu";
import { CHAT_MESSAGES } from "@/constants/chat/chat-messages.constants";
import { PAGE_ROUTES } from "@/constants/common/routes.constants";
import type { ThreadHeaderProps } from "@/interfaces/components/chat/thread/thread-header-props.interface";
import { useTypingUsers } from "@/hooks/chat/realtime/use-typing-users";
import {
  conversationTitle,
  directPartner,
} from "@/utilities/chat/conversation-display.utility";
import { describePresence } from "@/utilities/chat/presence.utility";
import { UserAvatar } from "@/components/common/avatars/user-avatar";
import { GenericIconButton } from "@/components/common/buttons/generic-icon-button";
import { ChatOptionsMenu } from "../options/chat-options-menu";

/** Back (phones), who you are talking to, their status (Online · custom line) or typing, and the details button. */
export function ThreadHeader({ conversation, onOpenInfo }: ThreadHeaderProps) {
  const partner = directPartner(conversation);
  const typing = useTypingUsers(conversation.id);
  const status =
    typing.length > 0
      ? CHAT_MESSAGES.SOMEONE_TYPING
      : partner
        ? describePresence(partner)
        : CHAT_MESSAGES.MEMBERS(conversation.membersCount);

  return (
    <HStack
      gap="3"
      px="4"
      py="3"
      borderBottomWidth="1px"
      borderColor="app.border"
    >
      <GenericIconButton label={CHAT_MESSAGES.BACK} asChild hideFrom="lg">
        <NextLink href={PAGE_ROUTES.MESSAGES}>
          <LuArrowLeft />
        </NextLink>
      </GenericIconButton>
      {partner ? (
        <NextLink href={PAGE_ROUTES.profile(partner.user.userName)}>
          <UserAvatar
            user={partner.user}
            size="md"
            isOnline={partner.isOnline}
            presence={partner.presence}
          />
        </NextLink>
      ) : (
        <Box
          as="button"
          onClick={onOpenInfo}
          aria-label={CHAT_MESSAGES.CHAT_INFO}
          boxSize="10"
          rounded="full"
          bgImage="{gradients.brand}"
          display="grid"
          placeItems="center"
          color="white"
          flexShrink={0}
        >
          <LuUsers />
        </Box>
      )}
      <Stack
        gap="0"
        flex="1"
        minW="0"
        // Tapping a group's name opens its info (members and admins), as on Instagram.
        {...(partner
          ? {}
          : {
              as: "button" as const,
              onClick: onOpenInfo,
              textAlign: "start" as const,
              cursor: "pointer",
            })}
      >
        <Text fontWeight="bold" truncate>
          {conversationTitle(conversation)}
        </Text>
        {status && (
          <Text
            fontSize="xs"
            color={typing.length > 0 ? "brand.fg" : "fg.muted"}
          >
            {status}
          </Text>
        )}
      </Stack>
      <GenericIconButton label={CHAT_MESSAGES.CHAT_INFO} onClick={onOpenInfo}>
        <LuInfo />
      </GenericIconButton>
      <ChatOptionsMenu conversation={conversation} />
    </HStack>
  );
}
