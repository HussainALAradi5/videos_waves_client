'use client'

import { Center } from '@chakra-ui/react'
import { MESSAGES } from '@/constants/common/messages.constants'
import type { LoadMoreProps } from '@/interfaces/components/common/lists/load-more-props.interface'
import { useInViewTrigger } from '@/hooks/common/use-in-view-trigger'
import { GenericButton } from '../buttons/generic-button'

/** Loads the next page when scrolled near, with a button for keyboard and slow connections. */
export function LoadMore({ hasNextPage, isFetchingNextPage, onLoadMore, label = MESSAGES.COMMON.LOAD_MORE }: LoadMoreProps) {
  const ref = useInViewTrigger<HTMLDivElement>(onLoadMore, hasNextPage && !isFetchingNextPage)
  if (!hasNextPage) return null
  return (
    <Center ref={ref} py="3">
      <GenericButton tone="ghost" size="sm" onClick={onLoadMore} isLoading={isFetchingNextPage}>
        {label}
      </GenericButton>
    </Center>
  )
}
