import type { TabItem } from '@/interfaces/common/tabs/tab-item.interface'

export interface AnimatedTabsProps {
  tabs: TabItem[]
  value: string
  onChange: (value: string) => void
  isFitted?: boolean
  size?: 'sm' | 'md' | 'lg'
}
