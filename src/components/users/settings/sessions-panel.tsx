'use client'

import { Badge, HStack, Icon, Stack, Text } from '@chakra-ui/react'
import { LuMonitorSmartphone } from 'react-icons/lu'
import { SETTINGS_MESSAGES } from '@/constants/users/settings/settings-messages.constants'
import { useSessions } from '@/hooks/users/auth/use-sessions'
import { formatRelativeDate } from '@/utilities/format/date-format.utility'
import { describeUserAgent } from '@/utilities/format/user-agent.utility'
import { GenericButton } from '@/components/common/buttons/generic-button'
import { SkeletonList } from '@/components/common/feedback/skeleton-list'
import { SettingsCard } from './settings-card'

export function SessionsPanel() {
  const { sessions, isLoading, revoke, signOutEverywhere } = useSessions()
  return (
    <SettingsCard title={SETTINGS_MESSAGES.DEVICES_TITLE} description={SETTINGS_MESSAGES.DEVICES_DESCRIPTION}>
      {isLoading && <SkeletonList rows={2} />}
      <Stack gap="1" py="2">
        {sessions.map((session) => (
          <HStack key={session.id} gap="3" py="2">
            <Icon size="lg" color="fg.muted">
              <LuMonitorSmartphone />
            </Icon>
            <Stack gap="0" flex="1" minW="0">
              <HStack gap="2">
                <Text fontWeight="semibold" truncate>
                  {describeUserAgent(session.userAgent) ?? SETTINGS_MESSAGES.UNKNOWN_DEVICE}
                </Text>
                {session.isCurrent && (
                  <Badge colorPalette="brand" rounded="full">
                    {SETTINGS_MESSAGES.THIS_DEVICE}
                  </Badge>
                )}
              </HStack>
              <Text fontSize="sm" color="fg.muted">
                {SETTINGS_MESSAGES.LAST_ACTIVE(formatRelativeDate(session.lastUsedAt))}
              </Text>
            </Stack>
            {!session.isCurrent && (
              <GenericButton size="xs" tone="outline" onClick={() => revoke(session.id)}>
                {SETTINGS_MESSAGES.SIGN_OUT_DEVICE}
              </GenericButton>
            )}
          </HStack>
        ))}
      </Stack>
      <GenericButton tone="dangerGhost" size="sm" onClick={signOutEverywhere} mb="2">
        {SETTINGS_MESSAGES.SIGN_OUT_EVERYWHERE}
      </GenericButton>
    </SettingsCard>
  )
}
