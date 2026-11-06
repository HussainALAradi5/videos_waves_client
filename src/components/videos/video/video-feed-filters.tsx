import { Stack } from '@chakra-ui/react'
import { MESSAGES } from '@/constants/common/messages.constants'
import { VIDEO_SORT_OPTIONS } from '@/constants/videos/video/video-sort.constants'
import { VideoSortField } from '@/enums/videos/video/video-sort-field.enum'
import type { VideoFeedFiltersProps } from '@/interfaces/components/videos/video/video-feed-filters-props.interface'
import { SearchInput } from '@/components/common/inputs/search-input'
import { SelectField } from '@/components/common/inputs/select-field'

export function VideoFeedFilters({ search, onSearchChange, sortBy, onSortChange }: VideoFeedFiltersProps) {
  return (
    <Stack direction={{ base: 'column', md: 'row' }} gap="3" mb="8">
      <SearchInput value={search} onChange={onSearchChange} placeholder={MESSAGES.VIDEOS.SEARCH_PLACEHOLDER} />
      <SelectField
        label={MESSAGES.VIDEOS.SORT_LABEL}
        value={sortBy}
        options={VIDEO_SORT_OPTIONS}
        onChange={(value) => onSortChange(value || VideoSortField.CREATED_AT)}
      />
    </Stack>
  )
}
