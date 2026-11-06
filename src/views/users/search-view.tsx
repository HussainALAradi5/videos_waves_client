'use client'

import { Stack } from '@chakra-ui/react'
import { SOCIAL_MESSAGES } from '@/constants/users/social/social-messages.constants'
import { useUserSearch } from '@/hooks/users/social/use-user-search'
import { PageHeader } from '@/components/common/layout/page-header'
import { SearchInput } from '@/components/common/inputs/search-input'
import { SkeletonList } from '@/components/common/feedback/skeleton-list'
import { EmptyState } from '@/components/common/feedback/empty-state'
import { LoadMore } from '@/components/common/lists/load-more'
import { Animated } from '@/components/common/motion/animated'
import { StaggerGroup } from '@/components/common/motion/stagger-group'
import { FollowButton } from '@/components/users/social/follow-button'
import { UserRow } from '@/components/users/social/user-row'

export function SearchView() {
  const { search, setSearch, results, hasQuery } = useUserSearch()
  return (
    <Stack gap="6" maxW="2xl" mx="auto">
      <PageHeader title={SOCIAL_MESSAGES.SEARCH_TITLE} description={SOCIAL_MESSAGES.SEARCH_DESCRIPTION} />
      <SearchInput value={search} onChange={setSearch} placeholder={SOCIAL_MESSAGES.SEARCH_PEOPLE} />
      {results.isLoading && <SkeletonList rows={6} />}
      {!hasQuery && <EmptyState title={SOCIAL_MESSAGES.SEARCH_PROMPT} />}
      {hasQuery && !results.isLoading && results.items.length === 0 && <EmptyState title={SOCIAL_MESSAGES.SEARCH_EMPTY} />}
      <StaggerGroup key={search}>
        <Stack gap="1">
          {results.items.map((person) => (
            <Animated key={person.id}>
              <UserRow user={person} action={person.isMe ? undefined : <FollowButton userName={person.userName} isFollowing={person.isFollowing} isRequested={person.isRequested} size="xs" />} />
            </Animated>
          ))}
        </Stack>
      </StaggerGroup>
      <LoadMore hasNextPage={results.hasNextPage} isFetchingNextPage={results.isFetchingNextPage} onLoadMore={results.fetchNextPage} />
    </Stack>
  )
}
