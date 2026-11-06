'use client'

import { Badge, Flex, Heading, HStack, Stack, Text } from '@chakra-ui/react'
import { ACCOUNT_STATUS_OPTIONS } from '@/constants/users/admin-users/admin-users.constants'
import { AccountStatus } from '@/enums/users/user/account-status.enum'
import { StatusBadge } from '@/components/common/badges/status-badge'
import { SOCIAL_MESSAGES } from '@/constants/users/social/social-messages.constants'
import type { ProfileHeaderProps } from '@/interfaces/components/users/profile/profile-header-props.interface'
import { UserAvatar } from '@/components/common/avatars/user-avatar'
import { ProfileStat } from './profile-stat'
import { ProfileActions } from './profile-actions'

/** Avatar with the brand ring, name, counts (followers and following open lists), bio, and actions. */
export function ProfileHeader({ profile, onOpenPeople }: ProfileHeaderProps) {
  return (
    <Flex direction={{ base: 'column', sm: 'row' }} gap={{ base: '5', md: '10' }} align={{ base: 'center', sm: 'flex-start' }} mb="8">
      <UserAvatar user={profile} size="2xl" hasRing />
      <Stack gap="4" flex="1" align={{ base: 'center', sm: 'flex-start' }} textAlign={{ base: 'center', sm: 'start' }}>
        <HStack gap="3" wrap="wrap" justify={{ base: 'center', sm: 'flex-start' }}>
          <Heading size="xl">{profile.userName}</Heading>
          {profile.followsYou && (
            <Badge rounded="full" variant="subtle">
              {SOCIAL_MESSAGES.FOLLOWS_YOU}
            </Badge>
          )}
          {!profile.isActive && <StatusBadge value={AccountStatus.INACTIVE} options={ACCOUNT_STATUS_OPTIONS} />}
        </HStack>
        <HStack gap="6">
          <ProfileStat value={profile.videosCount} label={SOCIAL_MESSAGES.VIDEOS} />
          <ProfileStat value={profile.followersCount} label={SOCIAL_MESSAGES.FOLLOWERS} onClick={() => onOpenPeople('followers')} />
          <ProfileStat value={profile.followingCount} label={SOCIAL_MESSAGES.FOLLOWING_LIST} onClick={() => onOpenPeople('following')} />
        </HStack>
        {profile.bio && (
          <Text whiteSpace="pre-wrap" maxW="lg">
            {profile.bio}
          </Text>
        )}
        <ProfileActions profile={profile} />
      </Stack>
    </Flex>
  )
}
