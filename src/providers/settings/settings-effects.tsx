'use client'

import { useApplySettings } from '@/hooks/users/settings/use-apply-settings'

/** Renders nothing; keeps app-wide settings applied. */
export function SettingsEffects() {
  useApplySettings()
  return null
}
