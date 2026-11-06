'use client'

import { SOCIAL_MESSAGES } from '@/constants/users/social/social-messages.constants'
import type { FollowButtonProps } from '@/interfaces/components/users/social/follow-button-props.interface'
import { useFollow } from '@/hooks/users/social/use-follow'
import { GenericButton } from '@/components/common/buttons/generic-button'

/** Gradient Follow (or Follow back); a quiet Following or Requested once sent (click again to undo). */
export function FollowButton({ userName, isFollowing, isRequested = false, isPrivate = false, followsYou = false, size = 'sm' }: FollowButtonProps) {
  const { toggle } = useFollow(userName, { isFollowing, isRequested, isPrivate })
  const isSent = isFollowing || isRequested
  const label = isFollowing ? SOCIAL_MESSAGES.FOLLOWING : isRequested ? SOCIAL_MESSAGES.REQUESTED : followsYou ? SOCIAL_MESSAGES.FOLLOW_BACK : SOCIAL_MESSAGES.FOLLOW
  return (
    <GenericButton size={size} tone={isSent ? 'secondary' : 'gradient'} onClick={toggle} minW="24">
      {label}
    </GenericButton>
  )
}
