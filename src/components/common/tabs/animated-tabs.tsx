'use client'

import { Badge, Tabs } from '@chakra-ui/react'
import type { AnimatedTabsProps } from '@/interfaces/components/common/tabs/animated-tabs-props.interface'

/** Pill tabs: a glass track with a brand-gradient pill that slides to the chosen tab (feed, inbox, notifications, settings). */
export function AnimatedTabs({ tabs, value, onChange, isFitted = false, size = 'md' }: AnimatedTabsProps) {
  return (
    <Tabs.Root value={value} onValueChange={(details) => onChange(details.value)} variant="enclosed" fitted={isFitted} size={size}>
      <Tabs.List rounded="full" bg="app.glass" backdropFilter="blur(12px)" borderWidth="1px" borderColor="app.border" p="1" gap="1">
        {tabs.map((tab) => (
          <Tabs.Trigger
            key={tab.value}
            value={tab.value}
            rounded="full"
            gap="2"
            zIndex="1"
            color="fg.muted"
            fontWeight="medium"
            transition="color 0.25s"
            _hover={{ color: 'fg' }}
            _selected={{ color: 'white', fontWeight: 'semibold', bg: 'transparent', shadow: 'none' }}
          >
            {tab.icon}
            {tab.label}
            {tab.badge ? (
              <Badge size="xs" rounded="full" bg="white" color="brand.fg">
                {tab.badge}
              </Badge>
            ) : null}
          </Tabs.Trigger>
        ))}
        <Tabs.Indicator rounded="full" bgImage="{gradients.brand}" shadow="glow" transition="all 0.32s cubic-bezier(0.22, 1, 0.36, 1)" />
      </Tabs.List>
    </Tabs.Root>
  )
}
