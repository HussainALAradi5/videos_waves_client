'use client'

import { Box, Button } from '@chakra-ui/react'
import { LuChevronDown } from 'react-icons/lu'
import { PRESENCE_MESSAGES, PRESENCE_MODE_COLORS, PRESENCE_OPTIONS } from '@/constants/chat/presence.constants'
import { PresenceMode } from '@/enums/users/settings/presence-mode.enum'
import { useSettings } from '@/hooks/users/settings/use-settings'
import { useUpdateSetting } from '@/hooks/users/settings/use-update-setting'
import { ActionMenu } from '@/components/common/dropdown/action-menu'

const Dot = ({ mode }: { mode: PresenceMode }) =>
  mode === PresenceMode.INVISIBLE ? (
    <Box boxSize="2.5" rounded="full" borderWidth="2px" borderColor={PRESENCE_MODE_COLORS[mode]} flexShrink={0} />
  ) : (
    <Box boxSize="2.5" rounded="full" bg={PRESENCE_MODE_COLORS[mode]} flexShrink={0} boxShadow={`0 0 0 3px color-mix(in srgb, var(--chakra-colors-${PRESENCE_MODE_COLORS[mode].replace('.', '-')}) 22%, transparent)`} />
  )

/** Your status as a small pill (dot and label); click it to pick Online, Away, Busy, or Appear offline. The custom line is in Settings. */
export function StatusPicker() {
  const { presence } = useSettings()
  const update = useUpdateSetting()
  const current = PRESENCE_OPTIONS.find((option) => option.value === presence) ?? PRESENCE_OPTIONS[0]
  return (
    <ActionMenu
      label={PRESENCE_MESSAGES.PICKER}
      trigger={
        <Button
          variant="ghost"
          size="xs"
          rounded="full"
          gap="2"
          px="2.5"
          fontWeight="semibold"
          color="fg"
          _hover={{ bg: 'app.surfaceHover' }}
          aria-label={PRESENCE_MESSAGES.CHANGE_HINT(current.label)}
          title={PRESENCE_MESSAGES.CHANGE_HINT(current.label)}
        >
          <Dot mode={presence} />
          {current.label}
          <LuChevronDown />
        </Button>
      }
      items={PRESENCE_OPTIONS.map((option) => ({
        key: option.value,
        label: option.label,
        icon: <Dot mode={option.value as PresenceMode} />,
        onSelect: () => update.mutate({ presence: option.value as PresenceMode })
      }))}
    />
  )
}
