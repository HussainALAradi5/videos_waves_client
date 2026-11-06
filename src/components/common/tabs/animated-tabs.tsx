'use client'

import { Badge, Tabs } from '@chakra-ui/react'
import type { AnimatedTabsProps } from '@/interfaces/components/common/tabs/animated-tabs-props.interface'

/** Segmented tabs with a sliding indicator (feed scope, inbox folders, profile sections). */
export function AnimatedTabs({ tabs, value, onChange, isFitted = false, size = 'md' }: AnimatedTabsProps) {
  return (
    <Tabs.Root value={value} onValueChange={(details) => onChange(details.value)} variant="enclosed" fitted={isFitted} size={size}>
      <Tabs.List rounded="full" bg="app.surface" borderWidth="1px" borderColor="app.border" p="1">
        {tabs.map((tab) => (
          <Tabs.Trigger key={tab.value} value={tab.value} rounded="full" gap="2" zIndex="1">
            {tab.icon}
            {tab.label}
            {tab.badge ? (
              <Badge size="xs" rounded="full" colorPalette="brand" variant="solid">
                {tab.badge}
              </Badge>
            ) : null}
          </Tabs.Trigger>
        ))}
        <Tabs.Indicator rounded="full" bgImage="{gradients.brandSoft}" shadow="none" />
      </Tabs.List>
    </Tabs.Root>
  )
}
