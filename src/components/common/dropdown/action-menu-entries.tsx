import { Menu } from '@chakra-ui/react'
import type { ActionMenuEntriesProps } from '@/interfaces/components/common/dropdown/action-menu-entries-props.interface'

/** Regular items first, then a separator, then destructive ones. */
export function ActionMenuEntries({ items }: ActionMenuEntriesProps) {
  const regular = items.filter((item) => !item.isDanger)
  const danger = items.filter((item) => item.isDanger)
  return (
    <>
      {regular.map((item) => (
        <Menu.Item key={item.key} value={item.key} onClick={item.onSelect} rounded="lg" gap="2.5" py="2">
          {item.icon}
          {item.label}
        </Menu.Item>
      ))}
      {regular.length > 0 && danger.length > 0 && <Menu.Separator />}
      {danger.map((item) => (
        <Menu.Item
          key={item.key}
          value={item.key}
          onClick={item.onSelect}
          color="fg.error"
          _hover={{ bg: 'bg.error', color: 'fg.error' }}
          rounded="lg"
          gap="2.5"
          py="2"
        >
          {item.icon}
          {item.label}
        </Menu.Item>
      ))}
    </>
  )
}
