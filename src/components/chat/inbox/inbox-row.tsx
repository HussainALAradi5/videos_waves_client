"use client";

import NextLink from "next/link";
import { Box, HStack, Icon, Stack, Text } from "@chakra-ui/react";
import { LuBellOff, LuUsers } from "react-icons/lu";
import { CHAT_MESSAGES } from "@/constants/chat/chat-messages.constants";
import type { InboxRowProps } from "@/interfaces/components/chat/inbox/inbox-row-props.interface";
import { useAuth } from "@/hooks/users/auth/use-auth";
import { useSettings } from "@/hooks/users/settings/use-settings";
import {
  conversationTitle,
  directPartner,
} from "@/utilities/chat/conversation-display.utility";
import { formatRelativeDate } from "@/utilities/format/date-format.utility";
import { UserAvatar } from "@/components/common/avatars/user-avatar";
import { MotionBox } from "@/components/common/motion/motion-box";
import { ChatOptionsMenu } from "../options/chat-options-menu";

/** One chat in the inbox: avatar (with online dot), name, last message, time, unread dot, and the chat options (⋯ or right-click). */
export function InboxRow({ conversation, isActive, href }: InboxRowProps) {
  const { user } = useAuth();
  const { messagePreviews } = useSettings();
  const partner = directPartner(conversation);
  const isUnread = conversation.me.unreadCount > 0;
  const last = conversation.lastMessage;
  const preview = last
    ? `${last.senderId === user?.id ? `${CHAT_MESSAGES.YOU}: ` : ""}${messagePreviews ? last.preview : ""}`
    : "";

  return (
    <MotionBox whileHover={{ x: 2 }} layout>
      <HStack
        gap="1"
        pe="1"
        rounded="xl"
        bg={isActive ? "bg.muted" : "transparent"}
        _hover={{ bg: "bg.muted" }}
      >
        <ChatOptionsMenu
          conversation={conversation}
          contextArea={
            <HStack asChild gap="3" px="3" py="2.5" flex="1" minW="0">
              <NextLink href={href}>
                {partner ? (
                  <UserAvatar
                    user={partner.user}
                    size="md"
                    isOnline={partner.isOnline}
                    presence={partner.presence}
                  />
                ) : (
                  <Box
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
                <Stack gap="0" flex="1" minW="0">
                  <HStack gap="1.5">
                    <Text fontWeight={isUnread ? "bold" : "semibold"} truncate>
                      {conversationTitle(conversation)}
                    </Text>
                    {conversation.me.isMuted && (
                      <Icon size="xs" color="fg.muted">
                        <LuBellOff />
                      </Icon>
                    )}
                  </HStack>
                  <Text
                    fontSize="sm"
                    color={isUnread ? "fg" : "fg.muted"}
                    fontWeight={isUnread ? "semibold" : "normal"}
                    truncate
                  >
                    {preview}
                    {last && ` · ${formatRelativeDate(last.createdAt)}`}
                  </Text>
                </Stack>
                {isUnread && (
                  <Box
                    boxSize="2.5"
                    rounded="full"
                    bgImage="{gradients.brand}"
                    flexShrink={0}
                  />
                )}
              </NextLink>
            </HStack>
          }
        />
      </HStack>
    </MotionBox>
  );
}
