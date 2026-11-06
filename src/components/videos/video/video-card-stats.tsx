import { HStack, Icon, Text } from '@chakra-ui/react'
import { LuHeart, LuMessageCircle } from 'react-icons/lu'
import type { VideoCardStatsProps } from '@/interfaces/components/videos/video/video-card-stats-props.interface'
import { formatCount } from '@/utilities/format/count-format.utility'

/** Likes and comments over the bottom-left of a thumbnail. */
export function VideoCardStats({ likes, comments }: VideoCardStatsProps) {
  return (
    <HStack position="absolute" bottom="2" left="3" gap="3" color="white" fontSize="sm" fontWeight="semibold">
      <HStack gap="1">
        <Icon size="sm">
          <LuHeart />
        </Icon>
        <Text>{formatCount(likes)}</Text>
      </HStack>
      <HStack gap="1">
        <Icon size="sm">
          <LuMessageCircle />
        </Icon>
        <Text>{formatCount(comments)}</Text>
      </HStack>
    </HStack>
  )
}
