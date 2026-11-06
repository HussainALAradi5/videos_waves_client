'use client'

import { Box, Center, SimpleGrid, Text } from '@chakra-ui/react'
import { MESSAGES } from '@/constants/common/messages.constants'
import { LAYOUT } from '@/constants/common/theme.constants'
import { useInViewTrigger } from '@/hooks/common/use-in-view-trigger'
import type { InfiniteGridProps } from '@/interfaces/components/common/lists/infinite-grid-props.interface'
import { GenericButton } from '../buttons/generic-button'
import { Animated } from '../motion/animated'
import { StaggerGroup } from '../motion/stagger-group'
import { WaveLoader } from '../waves/wave-loader'

/** Responsive grid whose items rise in one after another; loads the next page near the end, with a button fallback. */
export function InfiniteGrid<T>(props: InfiniteGridProps<T>) {
  const { items, getKey, renderItem, hasNextPage, isFetchingNextPage, onLoadMore, endLabel, columns } = props
  const sentinelRef = useInViewTrigger<HTMLDivElement>(onLoadMore, hasNextPage && !isFetchingNextPage)

  return (
    <Box>
      <StaggerGroup>
        <SimpleGrid columns={columns ?? LAYOUT.VIDEO_GRID_COLUMNS} gap="6">
          {items.map((item) => (
            <Animated key={getKey(item)}>{renderItem(item)}</Animated>
          ))}
        </SimpleGrid>
      </StaggerGroup>
      <Center ref={sentinelRef} py="8" minH="16">
        {isFetchingNextPage && <WaveLoader label={MESSAGES.COMMON.LOADING} />}
        {!isFetchingNextPage && hasNextPage && (
          <GenericButton tone="outline" onClick={onLoadMore}>
            {MESSAGES.COMMON.LOAD_MORE}
          </GenericButton>
        )}
        {!hasNextPage && endLabel && items.length > 0 && <Text color="fg.muted">{endLabel}</Text>}
      </Center>
    </Box>
  )
}
