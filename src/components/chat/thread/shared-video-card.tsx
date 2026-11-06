import NextLink from 'next/link'
import { AspectRatio, Box, Image, Stack, Text } from '@chakra-ui/react'
import { PAGE_ROUTES } from '@/constants/common/routes.constants'
import { LAYOUT } from '@/constants/common/theme.constants'
import type { SharedVideoCardProps } from '@/interfaces/components/chat/thread/shared-video-card-props.interface'

/** A Videos Waves video shared into the chat, linking to its page. */
export function SharedVideoCard({ video }: SharedVideoCardProps) {
  return (
    <Stack asChild gap="1.5" width="60" rounded="xl" overflow="hidden" bg="blackAlpha.200">
      <NextLink href={PAGE_ROUTES.video(video.id)}>
        <AspectRatio ratio={LAYOUT.VIDEO_ASPECT_RATIO}>
          <Box bg="black">{video.thumbnailUrl && <Image src={video.thumbnailUrl} alt={video.title} objectFit="cover" />}</Box>
        </AspectRatio>
        <Box px="2.5" pb="2">
          <Text fontWeight="semibold" fontSize="sm" lineClamp={2}>
            {video.title}
          </Text>
          <Text fontSize="xs" opacity={0.8}>
            {video.ownerUserName}
          </Text>
        </Box>
      </NextLink>
    </Stack>
  )
}
