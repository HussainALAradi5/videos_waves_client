import { HStack, Skeleton, SkeletonCircle, Stack } from '@chakra-ui/react'
import type { SkeletonListProps } from '@/interfaces/components/common/feedback/skeleton-list-props.interface'

const DEFAULT_ROWS = 5

/** Placeholder rows that keep the layout steady while a list loads. */
export function SkeletonList({ rows = DEFAULT_ROWS, hasAvatar = true }: SkeletonListProps) {
  return (
    <Stack gap="4" aria-busy>
      {Array.from({ length: rows }, (_, index) => (
        <HStack key={index} gap="3">
          {hasAvatar && <SkeletonCircle size="10" />}
          <Stack flex="1" gap="2">
            <Skeleton height="3" width="40%" rounded="full" />
            <Skeleton height="3" width="75%" rounded="full" />
          </Stack>
        </HStack>
      ))}
    </Stack>
  )
}
