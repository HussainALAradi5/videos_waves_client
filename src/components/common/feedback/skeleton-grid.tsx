import { AspectRatio, HStack, SimpleGrid, Skeleton, SkeletonCircle, Stack } from '@chakra-ui/react'
import { LAYOUT } from '@/constants/common/theme.constants'
import type { SkeletonGridProps } from '@/interfaces/components/common/feedback/skeleton-grid-props.interface'

const DEFAULT_ITEMS = 6

/** Video-card placeholders for the feed and profile grids. */
export function SkeletonGrid({ items = DEFAULT_ITEMS }: SkeletonGridProps) {
  return (
    <SimpleGrid columns={LAYOUT.VIDEO_GRID_COLUMNS} gap="6" aria-busy>
      {Array.from({ length: items }, (_, index) => (
        <Stack key={index} gap="3">
          <AspectRatio ratio={LAYOUT.VIDEO_ASPECT_RATIO}>
            <Skeleton rounded="2xl" />
          </AspectRatio>
          <HStack gap="3">
            <SkeletonCircle size="9" />
            <Stack flex="1" gap="2">
              <Skeleton height="3" width="80%" rounded="full" />
              <Skeleton height="3" width="50%" rounded="full" />
            </Stack>
          </HStack>
        </Stack>
      ))}
    </SimpleGrid>
  )
}
