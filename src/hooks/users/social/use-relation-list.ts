'use client'

import { useQueryClient } from '@tanstack/react-query'
import { PAGE_SIZES } from '@/constants/common/limits.constants'
import { QUERY_KEYS } from '@/constants/common/query-keys.constants'
import type { PublicUser } from '@/interfaces/users/user/public-user.interface'
import { socialService } from '@/services/users/social/social.service'
import { usePagedList } from '@/hooks/common/use-paged-list'

export type RelationKind = 'blocked' | 'restricted'

/** People you blocked or restricted, with an undo action for each. */
export const useRelationList = (kind: RelationKind) => {
  const queryClient = useQueryClient()
  const queryKey = kind === 'blocked' ? QUERY_KEYS.blocked : QUERY_KEYS.restricted
  const list = usePagedList<PublicUser>({
    queryKey,
    fetchPage: (page, signal) => (kind === 'blocked' ? socialService.blocked : socialService.restricted)({ page, pageSize: PAGE_SIZES.PEOPLE }, signal)
  })
  const undo = async (userName: string) => {
    await (kind === 'blocked' ? socialService.unblock(userName) : socialService.unrestrict(userName))
    await queryClient.invalidateQueries({ queryKey: QUERY_KEYS.people })
  }
  return { ...list, undo }
}
