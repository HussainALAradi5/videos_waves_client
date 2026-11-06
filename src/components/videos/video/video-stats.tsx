import { HStack, Icon, Text } from '@chakra-ui/react'
import { LuEye, LuMessageCircle } from 'react-icons/lu'
import type { VideoStatsProps } from '@/interfaces/components/videos/video/video-stats-props.interface'
import { formatCount } from '@/utilities/format/count-format.utility'

export function VideoStats({ commentsCount, viewsCount }: VideoStatsProps) {
  return (
    <HStack gap="4" color="fg.muted" fontSize="sm">
      <HStack gap="1" aria-label={`${commentsCount} comments`}>
        <Icon>
          <LuMessageCircle />
        </Icon>
        <Text>{formatCount(commentsCount)}</Text>
      </HStack>
      <HStack gap="1" aria-label={`${viewsCount} views`}>
        <Icon>
          <LuEye />
        </Icon>
        <Text>{formatCount(viewsCount)}</Text>
      </HStack>
    </HStack>
  )
}
