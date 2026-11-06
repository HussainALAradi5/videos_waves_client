'use client'

import { useState } from 'react'
import { LuLock } from 'react-icons/lu'
import { PAGE_SIZES } from '@/constants/common/limits.constants'
import { SOCIAL_MESSAGES } from '@/constants/users/social/social-messages.constants'
import type { ProfileViewProps } from '@/interfaces/components/views/profile-view-props.interface'
import type { PeopleList } from '@/hooks/users/social/use-people'
import { useProfile } from '@/hooks/users/social/use-profile'
import { notifyInfo } from '@/utilities/toast/notify.utility'
import { EmptyState } from '@/components/common/feedback/empty-state'
import { ErrorState } from '@/components/common/feedback/error-state'
import { LoadingState } from '@/components/common/feedback/loading-state'
import { FollowRequestBanner } from '@/components/users/profile/follow-request-banner'
import { ProfileHeader } from '@/components/users/profile/profile-header'
import { PeopleDialog } from '@/components/users/social/people-dialog'
import { VideoGrid } from '@/components/videos/video/video-grid'

export function ProfileView({ userName }: ProfileViewProps) {
  const { profile, isLoading, error, isMissing, refetch } = useProfile(userName)
  const [people, setPeople] = useState<PeopleList | null>(null)

  if (isLoading) return <LoadingState />
  if (isMissing || !profile) return error && !isMissing ? <ErrorState error={error} onRetry={refetch} /> : <EmptyState title={SOCIAL_MESSAGES.NOT_FOUND} />
  return (
    <>
      <ProfileHeader profile={profile} onOpenPeople={(list) => (profile.canViewContent ? setPeople(list) : notifyInfo(SOCIAL_MESSAGES.PRIVATE_HINT))} />
      <FollowRequestBanner profile={profile} />
      {profile.isBlocked ? (
        <EmptyState title={SOCIAL_MESSAGES.BLOCKED(profile.userName)} description={SOCIAL_MESSAGES.BLOCKED_HINT} />
      ) : !profile.canViewContent ? (
        <EmptyState
          icon={<LuLock />}
          title={SOCIAL_MESSAGES.PRIVATE_TITLE}
          description={profile.isRequested ? SOCIAL_MESSAGES.PRIVATE_REQUESTED_HINT : SOCIAL_MESSAGES.PRIVATE_HINT}
        />
      ) : (
        <VideoGrid query={{ ownerId: profile.id, pageSize: PAGE_SIZES.MY_VIDEOS }} emptyTitle={SOCIAL_MESSAGES.NO_VIDEOS} emptyDescription="" />
      )}
      <PeopleDialog userName={profile.userName} list={people} onClose={() => setPeople(null)} />
    </>
  )
}
