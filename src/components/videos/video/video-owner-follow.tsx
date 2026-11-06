'use client'

import type { VideoOwnerFollowProps } from '@/interfaces/components/videos/video/video-owner-follow-props.interface'
import { useProfile } from '@/hooks/users/social/use-profile'
import { FollowButton } from '@/components/users/social/follow-button'

/** Follow for the video owner, from their real follow state (the same cache the profile page uses). */
export function VideoOwnerFollow({ userName }: VideoOwnerFollowProps) {
  const { profile } = useProfile(userName)
  if (!profile || profile.isMe || profile.isBlocked) return null
  return (
    <FollowButton
      userName={userName}
      isFollowing={profile.isFollowing}
      isRequested={profile.isRequested}
      isPrivate={profile.isPrivate}
      followsYou={profile.followsYou}
      size="xs"
    />
  )
}
