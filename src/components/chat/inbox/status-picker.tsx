'use client'

import { PRESENCE_OPTIONS } from '@/constants/chat/presence.constants'
import { useSettings } from '@/hooks/users/settings/use-settings'
import { useUpdateSetting } from '@/hooks/users/settings/use-update-setting'
import { SelectDropdown } from '@/components/common/dropdown/select-dropdown'

/** Your status (online, away, busy, appear offline) right above your chats; the custom line is in Settings. */
export function StatusPicker() {
  const { presence } = useSettings()
  const update = useUpdateSetting()
  return (
    <SelectDropdown
      options={PRESENCE_OPTIONS}
      value={presence}
      onChange={(value) => update.mutate({ presence: value as typeof presence })}
      width="40"
      size="sm"
    />
  )
}
