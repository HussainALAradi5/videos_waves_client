import { Box, HStack, Icon, Image, Link, SimpleGrid, Text } from '@chakra-ui/react'
import { LuFileText } from 'react-icons/lu'
import type { MessageAttachmentsProps } from '@/interfaces/components/chat/thread/message-attachments-props.interface'

const isImage = (mimeType: string) => mimeType.startsWith('image/')
const isVideo = (mimeType: string) => mimeType.startsWith('video/')

/** Photos in a grid, videos inline, and other files as download chips (all through short-lived signed links). */
export function MessageAttachments({ attachments }: MessageAttachmentsProps) {
  const media = attachments.filter((item) => isImage(item.mimeType) || isVideo(item.mimeType))
  const files = attachments.filter((item) => !isImage(item.mimeType) && !isVideo(item.mimeType))
  return (
    <>
      {media.length > 0 && (
        <SimpleGrid columns={media.length === 1 ? 1 : 2} gap="1" rounded="xl" overflow="hidden" maxW="72">
          {media.map((item) =>
            isImage(item.mimeType) ? (
              <Link key={item.id} href={item.url} target="_blank" rel="noreferrer">
                <Image src={item.url} alt={item.originalName} objectFit="cover" width="full" aspectRatio={media.length === 1 ? undefined : 1} />
              </Link>
            ) : (
              <Box key={item.id} asChild>
                <video src={item.url} controls playsInline preload="metadata" style={{ width: '100%' }} />
              </Box>
            )
          )}
        </SimpleGrid>
      )}
      {files.map((item) => (
        <HStack asChild key={item.id} gap="2" p="2" rounded="lg" bg="blackAlpha.100">
          <Link href={item.url} target="_blank" rel="noreferrer">
            <Icon>
              <LuFileText />
            </Icon>
            <Text fontSize="sm" truncate>
              {item.originalName}
            </Text>
          </Link>
        </HStack>
      ))}
    </>
  )
}
