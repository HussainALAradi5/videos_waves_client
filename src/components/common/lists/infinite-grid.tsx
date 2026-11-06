'use client'

import { Box, Button, Center, SimpleGrid, Spinner, Text } from '@chakra-ui/react'
import { MESSAGES } from '@/constants/common/messages.constants'
import { LAYOUT } from '@/constants/common/theme.constants'
import { useInViewTrigger } from '@/hooks/common/use-in-view-trigger'
import type { InfiniteGridProps } from '@/interfaces/components/common/lists/infinite-grid-props.interface'

/** Responsive grid that loads the next page when its end scrolls into view, with a button fallback. */
export function InfiniteGrid<T>(props: InfiniteGridProps<T>) {
  const { items, getKey, renderItem, hasNextPage, isFetchingNextPage, onLoadMore, endLabel, columns } = props
  const sentinelRef = useInViewTrigger<HTMLDivElement>(onLoadMore, hasNextPage && !isFetchingNextPage)

  return (
    <Box>
      <SimpleGrid columns={columns ?? LAYOUT.VIDEO_GRID_COLUMNS} gap="6">
        {items.map((item) => (
          <Box key={getKey(item)}>{renderItem(item)}</Box>
        ))}
      </SimpleGrid>
      <Center ref={sentinelRef} py="8" minH="16">
        {isFetchingNextPage && <Spinner />}
        {!isFetchingNextPage && hasNextPage && (
          <Button variant="outline" onClick={onLoadMore}>
            {MESSAGES.COMMON.LOAD_MORE}
          </Button>
        )}
        {!hasNextPage && endLabel && <Text color="fg.muted">{endLabel}</Text>}
      </Center>
    </Box>
  )
}
