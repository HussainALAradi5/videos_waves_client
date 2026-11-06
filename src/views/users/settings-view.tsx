'use client'

import { useState } from 'react'
import { Stack } from '@chakra-ui/react'
import { SETTINGS_MESSAGES } from '@/constants/users/settings/settings-messages.constants'
import { SOCIAL_MESSAGES } from '@/constants/users/social/social-messages.constants'
import { useAuth } from '@/hooks/users/auth/use-auth'
import { RequireAuth } from '@/middlewares/auth/require-auth'
import { PageHeader } from '@/components/common/layout/page-header'
import { AnimatedTabs } from '@/components/common/tabs/animated-tabs'
import { AccountPanel } from '@/components/users/settings/account-panel'
import { PreferencesPanel } from '@/components/users/settings/preferences-panel'
import { RelationListPanel } from '@/components/users/settings/relation-list-panel'
import { SessionsPanel } from '@/components/users/settings/sessions-panel'

const TABS = [
  { value: 'account', label: SETTINGS_MESSAGES.TAB_ACCOUNT },
  { value: 'preferences', label: SETTINGS_MESSAGES.TAB_PREFERENCES },
  { value: 'security', label: SETTINGS_MESSAGES.TAB_SECURITY }
]

export function SettingsView() {
  const { user } = useAuth()
  const [tab, setTab] = useState(TABS[0].value)
  return (
    <RequireAuth>
      <Stack gap="6" maxW="3xl" mx="auto">
        <PageHeader title={SETTINGS_MESSAGES.TITLE} description={SETTINGS_MESSAGES.DESCRIPTION} />
        <AnimatedTabs tabs={TABS} value={tab} onChange={setTab} isFitted />
        {tab === 'account' && user && <AccountPanel user={user} />}
        {tab === 'preferences' && <PreferencesPanel />}
        {tab === 'security' && (
          <Stack gap="6">
            <SessionsPanel />
            <RelationListPanel kind="blocked" title={SETTINGS_MESSAGES.BLOCKED_TITLE} actionLabel={SOCIAL_MESSAGES.UNBLOCK} />
            <RelationListPanel kind="restricted" title={SETTINGS_MESSAGES.RESTRICTED_TITLE} actionLabel={SOCIAL_MESSAGES.UNRESTRICT} />
          </Stack>
        )}
      </Stack>
    </RequireAuth>
  )
}
