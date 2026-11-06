'use client'

import { SOCIAL_MESSAGES } from '@/constants/users/social/social-messages.constants'
import type { FollowButtonProps } from '@/interfaces/components/users/social/follow-button-props.interface'
import { useFollow } from '@/hooks/users/social/use-follow'
import { GenericButton } from '@/components/common/buttons/generic-button'

/** Gradient Follow (or Follow back) that turns into a quiet Following button. */
export function FollowButton({ userName, isFollowing, followsYou = false, size = 'sm' }: FollowButtonProps) {
  const { toggle } = useFollow(userName, isFollowing)
  const label = isFollowing ? SOCIAL_MESSAGES.FOLLOWING : followsYou ? SOCIAL_MESSAGES.FOLLOW_BACK : SOCIAL_MESSAGES.FOLLOW
  return (
    <GenericButton size={size} tone={isFollowing ? 'secondary' : 'gradient'} onClick={toggle} minW="24">
      {label}
    </GenericButton>
  )
}
