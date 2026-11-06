import { Badge } from '@chakra-ui/react'
import { LuBadgeCheck } from 'react-icons/lu'
import { COMMENT_MESSAGES } from '@/constants/videos/comment/comment-messages.constants'

/** Marks comments written by the person who posted the video. */
export function OwnerBadge() {
  return (
    <Badge rounded="full" size="xs" px="2" color="white" bgImage="{gradients.brand}" gap="1">
      <LuBadgeCheck />
      {COMMENT_MESSAGES.OWNER}
    </Badge>
  )
}
