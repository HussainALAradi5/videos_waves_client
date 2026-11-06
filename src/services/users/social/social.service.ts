import { USER_ENDPOINTS } from '@/config/api/endpoints/users.endpoints'
import type { RelationQueryDto } from '@/dtos/users/profile/relation-query.dto'
import type { UserSearchQueryDto } from '@/dtos/users/profile/user-search-query.dto'
import type { FollowState } from '@/interfaces/users/profile/follow-state.interface'
import type { Profile } from '@/interfaces/users/profile/profile.interface'
import type { RelationState } from '@/interfaces/users/profile/relation-state.interface'
import type { UserSummary } from '@/interfaces/users/profile/user-summary.interface'
import type { PublicUser } from '@/interfaces/users/user/public-user.interface'
import { deleteData, getData, getPage, putData } from '../../api/api-request'

export const socialService = {
  getProfile: (userName: string, signal?: AbortSignal) => getData<Profile>(USER_ENDPOINTS.profile(userName), { signal }),
  search: (query: UserSearchQueryDto, signal?: AbortSignal) => getPage<UserSummary>(USER_ENDPOINTS.SEARCH, query, signal),
  followers: (userName: string, query: RelationQueryDto, signal?: AbortSignal) =>
    getPage<UserSummary>(USER_ENDPOINTS.followers(userName), query, signal),
  following: (userName: string, query: RelationQueryDto, signal?: AbortSignal) =>
    getPage<UserSummary>(USER_ENDPOINTS.following(userName), query, signal),
  follow: (userName: string) => putData<FollowState>(USER_ENDPOINTS.follow(userName)),
  unfollow: (userName: string) => deleteData<FollowState>(USER_ENDPOINTS.follow(userName)),
  block: (userName: string) => putData<RelationState>(USER_ENDPOINTS.block(userName)),
  unblock: (userName: string) => deleteData<RelationState>(USER_ENDPOINTS.block(userName)),
  restrict: (userName: string) => putData<RelationState>(USER_ENDPOINTS.restrict(userName)),
  unrestrict: (userName: string) => deleteData<RelationState>(USER_ENDPOINTS.restrict(userName)),
  blocked: (query: RelationQueryDto, signal?: AbortSignal) => getPage<PublicUser>(USER_ENDPOINTS.ME_BLOCKED, query, signal),
  restricted: (query: RelationQueryDto, signal?: AbortSignal) =>
    getPage<PublicUser>(USER_ENDPOINTS.ME_RESTRICTED, query, signal)
}
