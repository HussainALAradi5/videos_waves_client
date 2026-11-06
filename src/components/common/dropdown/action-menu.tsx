'use client'

import { Menu, Portal } from '@chakra-ui/react'
import { LuEllipsis } from 'react-icons/lu'
import type { ActionMenuProps } from '@/interfaces/components/common/dropdown/action-menu-props.interface'
import { GenericIconButton } from '../buttons/generic-icon-button'
import { ActionMenuEntries } from './action-menu-entries'

/** The three-dots menu used for edit, delete, block, and every other per-item action; optionally also on right-click. */
export function ActionMenu({ items, label, trigger, size = 'sm', contextArea }: ActionMenuProps) {
  const visible = items.filter((item) => !item.isHidden)
  if (visible.length === 0) return contextArea ?? null
  return (
    <Menu.Root positioning={{ placement: 'bottom-end' }}>
      {contextArea && <Menu.ContextTrigger asChild>{contextArea}</Menu.ContextTrigger>}
      <Menu.Trigger asChild>
        {trigger ?? (
          <GenericIconButton label={label} size={size}>
            <LuEllipsis />
          </GenericIconButton>
        )}
      </Menu.Trigger>
      <Portal>
        <Menu.Positioner>
          <Menu.Content minW="44" rounded="xl" shadow="lg" p="1" animationDuration="fast">
            <ActionMenuEntries items={visible} />
          </Menu.Content>
        </Menu.Positioner>
      </Portal>
    </Menu.Root>
  )
}
