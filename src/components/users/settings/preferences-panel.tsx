'use client'

import { Stack, StackSeparator } from '@chakra-ui/react'
import { SETTING_SECTIONS } from '@/constants/users/settings/setting-sections.constants'
import { BubblePreview } from './bubble-preview'
import { SettingRow } from './setting-row'
import { SettingsCard } from './settings-card'

/** Every preference section and row, generated from SETTING_SECTIONS. */
export function PreferencesPanel() {
  return (
    <Stack gap="6">
      {SETTING_SECTIONS.map((section) => (
        <SettingsCard key={section.key} title={section.title} description={section.description}>
          <Stack separator={<StackSeparator borderColor="app.border" />} gap="0">
            {section.rows.map((row) => (
              <SettingRow key={row.key} config={row} />
            ))}
          </Stack>
          {section.preview === 'bubbles' && <BubblePreview />}
        </SettingsCard>
      ))}
    </Stack>
  )
}
