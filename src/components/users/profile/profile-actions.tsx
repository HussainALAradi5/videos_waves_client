'use client'

import NextLink from 'next/link'
import { HStack } from '@chakra-ui/react'
import { LuBan, LuEyeOff, LuMessageCircle } from 'react-icons/lu'
import { PAGE_ROUTES } from '@/constants/common/routes.constants'
import { SOCIAL_MESSAGES } from '@/constants/users/social/social-messages.constants'
import type { ProfileActionsProps } from '@/interfaces/components/users/profile/profile-actions-props.interface'
import { useAuth } from '@/hooks/users/auth/use-auth'
import { useRelationActions } from '@/hooks/users/social/use-relation-actions'
import { useStartChat } from '@/hooks/chat/conversation/use-start-chat'
import { GenericButton } from '@/components/common/buttons/generic-button'
import { ActionMenu } from '@/components/common/dropdown/action-menu'
import { ConfirmDialog } from '@/components/common/dialogs/confirm-dialog'
import { FollowButton } from '../social/follow-button'

/** Your own profile: Edit profile. Someone else: Follow, Message, and Block or Restrict in the menu. */
export function ProfileActions({ profile }: ProfileActionsProps) {
  const { isAuthenticated } = useAuth()
  const relation = useRelationActions(profile)
  const startChat = useStartChat()

  if (profile.isMe) {
    return (
      <GenericButton asChild tone="secondary" size="sm">
        <NextLink href={PAGE_ROUTES.SETTINGS}>{SOCIAL_MESSAGES.EDIT_PROFILE}</NextLink>
      </GenericButton>
    )
  }
  return (
    <HStack gap="2">
      {!profile.isBlocked && <FollowButton userName={profile.userName} isFollowing={profile.isFollowing} followsYou={profile.followsYou} />}
      {isAuthenticated && !profile.isBlocked && (
        <GenericButton tone="secondary" size="sm" leftIcon={<LuMessageCircle />} onClick={() => startChat(profile.userName)}>
          {SOCIAL_MESSAGES.MESSAGE}
        </GenericButton>
      )}
      {isAuthenticated && (
        <ActionMenu
          label={SOCIAL_MESSAGES.PROFILE_OPTIONS}
          items={[
            { key: 'restrict', label: profile.isRestricted ? SOCIAL_MESSAGES.UNRESTRICT : SOCIAL_MESSAGES.RESTRICT, icon: <LuEyeOff />, onSelect: () => void relation.toggleRestrict(), isHidden: profile.isBlocked },
            { key: 'block', label: profile.isBlocked ? SOCIAL_MESSAGES.UNBLOCK : SOCIAL_MESSAGES.BLOCK, icon: <LuBan />, onSelect: () => void relation.requestBlock(), isDanger: true }
          ]}
        />
      )}
      <ConfirmDialog
        isOpen={relation.isBlockConfirmOpen}
        onClose={relation.cancelBlock}
        onConfirm={relation.confirmBlock}
        isLoading={relation.isBlocking}
        title={SOCIAL_MESSAGES.BLOCK_TITLE(profile.userName)}
        description={SOCIAL_MESSAGES.BLOCK_DESCRIPTION}
        confirmLabel={SOCIAL_MESSAGES.BLOCK}
      />
    </HStack>
  )
}
