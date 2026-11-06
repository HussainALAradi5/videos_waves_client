'use client'

import { Button, Icon } from '@chakra-ui/react'
import { FaHeart, FaRegHeart } from 'react-icons/fa6'
import { MESSAGES } from '@/constants/common/messages.constants'
import { TRANSITIONS } from '@/constants/common/motion.constants'
import type { LikeButtonProps } from '@/interfaces/components/videos/video/like-button-props.interface'
import { AnimatedCount } from '@/components/common/counters/animated-count'
import { MotionBox } from '@/components/common/motion/motion-box'

/** Heart that springs when liked, with a rolling count. Optimistic, so it never waits for the server. */
export function LikeButton({ isLiked, likesCount, onToggle }: LikeButtonProps) {
  return (
    <Button variant="subtle" rounded="full" onClick={onToggle} aria-pressed={isLiked} aria-label={isLiked ? MESSAGES.VIDEOS.UNLIKE : MESSAGES.VIDEOS.LIKE}>
      <MotionBox key={String(isLiked)} initial={{ scale: 0.6 }} animate={{ scale: 1 }} transition={TRANSITIONS.spring} display="inline-flex">
        <Icon color={isLiked ? 'coral.500' : undefined}>{isLiked ? <FaHeart /> : <FaRegHeart />}</Icon>
      </MotionBox>
      <AnimatedCount value={likesCount} />
    </Button>
  )
}
