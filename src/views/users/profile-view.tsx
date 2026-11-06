'use client'

import { Heading, Stack } from '@chakra-ui/react'
import { MESSAGES } from '@/constants/common/messages.constants'
import { PAGE_SIZES } from '@/constants/common/limits.constants'
import { useAuth } from '@/hooks/users/auth/use-auth'
import { RequireAuth } from '@/middlewares/auth/require-auth'
import { PageHeader } from '@/components/common/layout/page-header'
import { ProfileSummary } from '@/components/users/user/profile-summary'
import { AdminRequestPanel } from '@/components/users/admin-request/admin-request-panel'
import { VideoInfiniteGrid } from '@/components/videos/video/video-infinite-grid'

export function ProfileView() {
  const { user } = useAuth()

  return (
    <RequireAuth>
      {user && (
        <Stack gap="8">
          <PageHeader title={MESSAGES.PROFILE.TITLE} />
          <ProfileSummary user={user} />
          <AdminRequestPanel />
          <Stack as="section" gap="5">
            <Heading as="h2" size="lg">
              {MESSAGES.VIDEOS.MY_VIDEOS}
            </Heading>
            <VideoInfiniteGrid query={{ ownerId: user.id, pageSize: PAGE_SIZES.MY_VIDEOS }} emptyTitle={MESSAGES.VIDEOS.MY_VIDEOS_EMPTY} />
          </Stack>
        </Stack>
      )}
    </RequireAuth>
  )
}
