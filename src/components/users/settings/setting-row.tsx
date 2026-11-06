'use client'

import { Flex, Stack, Switch, Text } from '@chakra-ui/react'
import { SettingControl } from '@/enums/users/settings/setting-control.enum'
import type { SettingRowProps } from '@/interfaces/components/users/settings/setting-row-props.interface'
import { useSettings } from '@/hooks/users/settings/use-settings'
import { useUpdateSetting } from '@/hooks/users/settings/use-update-setting'
import { SelectDropdown } from '@/components/common/dropdown/select-dropdown'
import { BubbleSwatches } from './bubble-swatches'

/** One setting: label and description on the left, its control (switch, dropdown, swatches) on the right. Saves instantly. */
export function SettingRow({ config }: SettingRowProps) {
  const settings = useSettings()
  const update = useUpdateSetting()
  const value = settings[config.key]
  const save = (next: unknown) => update.mutate({ [config.key]: next })

  return (
    <Flex gap="4" py="4" justify="space-between" align={{ base: 'flex-start', sm: 'center' }} direction={{ base: 'column', sm: 'row' }}>
      <Stack gap="0.5" maxW="md">
        <Text fontWeight="semibold">{config.label}</Text>
        <Text fontSize="sm" color="fg.muted">
          {config.description}
        </Text>
      </Stack>
      {config.control === SettingControl.SWITCH && (
        <Switch.Root checked={Boolean(value)} onCheckedChange={(details) => save(details.checked)} colorPalette="brand" size="lg">
          <Switch.HiddenInput aria-label={config.label} />
          <Switch.Control />
        </Switch.Root>
      )}
      {config.control === SettingControl.SELECT && (
        <SelectDropdown options={config.options ?? []} value={String(value)} onChange={save} width="56" />
      )}
      {config.control === SettingControl.SWATCHES && <BubbleSwatches options={config.options ?? []} value={String(value)} onChange={save} />}
    </Flex>
  )
}
