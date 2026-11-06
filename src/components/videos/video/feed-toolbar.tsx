'use client'

import { Flex, HStack } from '@chakra-ui/react'
import { LuCompass, LuSparkles, LuUsers } from 'react-icons/lu'
import { MESSAGES } from '@/constants/common/messages.constants'
import { VIDEO_SORT_OPTIONS } from '@/constants/videos/video/video-sort.constants'
import { VIDEO_MESSAGES } from '@/constants/videos/video/video-messages.constants'
import { FeedScope } from '@/enums/videos/video/feed-scope.enum'
import type { VideoSortField } from '@/enums/videos/video/video-sort-field.enum'
import type { FeedToolbarProps } from '@/interfaces/components/videos/video/feed-toolbar-props.interface'
import { AnimatedTabs } from '@/components/common/tabs/animated-tabs'
import { SearchInput } from '@/components/common/inputs/search-input'
import { SelectDropdown } from '@/components/common/dropdown/select-dropdown'

/** For you / Following / Discover tabs, search, and sort above the feed. */
export function FeedToolbar(props: FeedToolbarProps) {
  const { scope, onScopeChange, search, onSearchChange, sortBy, onSortChange, canSeeFollowing } = props
  const tabs = [
    { value: FeedScope.ALL, label: VIDEO_MESSAGES.FOR_YOU, icon: <LuSparkles /> },
    ...(canSeeFollowing ? [{ value: FeedScope.FOLLOWING, label: VIDEO_MESSAGES.FOLLOWING, icon: <LuUsers /> }] : []),
    { value: FeedScope.DISCOVER, label: VIDEO_MESSAGES.DISCOVER, icon: <LuCompass /> }
  ]
  return (
    <Flex direction={{ base: 'column', md: 'row' }} gap="3" justify="space-between" align={{ md: 'center' }} mb="6">
      <AnimatedTabs tabs={tabs} value={scope} onChange={(value) => onScopeChange(value as FeedScope)} size="sm" />
      <HStack gap="3" flex={{ md: '0 1 32rem' }}>
        <SearchInput value={search} onChange={onSearchChange} placeholder={MESSAGES.VIDEOS.SEARCH_PLACEHOLDER} />
        <SelectDropdown options={VIDEO_SORT_OPTIONS} value={sortBy} onChange={(value) => onSortChange(value as VideoSortField)} width="44" size="md" />
      </HStack>
    </Flex>
  )
}
