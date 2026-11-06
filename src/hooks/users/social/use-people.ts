'use client'

import { PAGE_SIZES } from '@/constants/common/limits.constants'
import { QUERY_KEYS } from '@/constants/common/query-keys.constants'
import type { UserSummary } from '@/interfaces/users/profile/user-summary.interface'
import { socialService } from '@/services/users/social/social.service'
import { usePagedList } from '@/hooks/common/use-paged-list'

export type PeopleList = 'followers' | 'following'

/** Followers or following of a profile, paged, loaded only while the list is open. */
export const usePeople = (userName: string, list: PeopleList | null) =>
  usePagedList<UserSummary>({
    queryKey: list === 'following' ? QUERY_KEYS.following(userName) : QUERY_KEYS.followers(userName),
    fetchPage: (page, signal) =>
      (list === 'following' ? socialService.following : socialService.followers)(userName, { page, pageSize: PAGE_SIZES.PEOPLE }, signal),
    isEnabled: list !== null
  })
