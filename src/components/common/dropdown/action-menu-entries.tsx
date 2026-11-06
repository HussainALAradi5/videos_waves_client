import { Box, Menu, Portal } from '@chakra-ui/react'
import { LuChevronRight } from 'react-icons/lu'
import type { ActionMenuItem } from '@/interfaces/common/dropdown/action-menu-item.interface'
import type { ActionMenuEntriesProps } from '@/interfaces/components/common/dropdown/action-menu-entries-props.interface'

const DANGER_STYLE = { color: 'fg.error', _hover: { bg: 'bg.error', color: 'fg.error' } } as const

/** One entry; an item with `children` opens them as a submenu to the side (Mute › 8 hours, 1 week, …). */
function ActionMenuEntry({ item }: { item: ActionMenuItem }) {
  const style = item.isDanger ? DANGER_STYLE : {}
  if (item.children) {
    return (
      <Menu.Root positioning={{ placement: 'right-start', gutter: 4 }}>
        <Menu.TriggerItem rounded="lg" gap="2.5" py="2" {...style}>
          {item.icon}
          {item.label}
          <Box as="span" ms="auto" color="fg.muted">
            <LuChevronRight />
          </Box>
        </Menu.TriggerItem>
        <Portal>
          <Menu.Positioner>
            <Menu.Content minW="40" rounded="xl" shadow="lg" p="1" animationDuration="fast">
              {item.children.filter((child) => !child.isHidden).map((child) => (
                <ActionMenuEntry key={child.key} item={child} />
              ))}
            </Menu.Content>
          </Menu.Positioner>
        </Portal>
      </Menu.Root>
    )
  }
  return (
    <Menu.Item value={item.key} onClick={item.onSelect} rounded="lg" gap="2.5" py="2" {...style}>
      {item.icon}
      {item.label}
    </Menu.Item>
  )
}

/** Regular items first, then a separator, then destructive ones. */
export function ActionMenuEntries({ items }: ActionMenuEntriesProps) {
  const regular = items.filter((item) => !item.isDanger)
  const danger = items.filter((item) => item.isDanger)
  return (
    <>
      {regular.map((item) => (
        <ActionMenuEntry key={item.key} item={item} />
      ))}
      {regular.length > 0 && danger.length > 0 && <Menu.Separator />}
      {danger.map((item) => (
        <ActionMenuEntry key={item.key} item={item} />
      ))}
    </>
  )
}
