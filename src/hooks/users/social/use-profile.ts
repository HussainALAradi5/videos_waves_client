'use client'

import { useQuery } from '@tanstack/react-query'
import { QUERY_KEYS } from '@/constants/common/query-keys.constants'
import { socialService } from '@/services/users/social/social.service'
import { isNotFoundError } from '@/utilities/errors/api-error.utility'

export const useProfile = (userName: string) => {
  const query = useQuery({
    queryKey: QUERY_KEYS.profile(userName),
    queryFn: ({ signal }) => socialService.getProfile(userName, signal)
  })
  return { profile: query.data, isLoading: query.isPending, error: query.error, isMissing: isNotFoundError(query.error), refetch: () => void query.refetch() }
}
