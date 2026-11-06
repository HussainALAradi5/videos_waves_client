'use client'

import { HStack } from '@chakra-ui/react'
import { NAV_INDICATORS, SHELL } from '@/constants/common/navigation.constants'
import { useNavigation } from '@/hooks/common/use-navigation'
import { NavLink } from './nav-link'

/** Phone navigation pinned to the bottom, above the safe area. */
export function BottomTabBar() {
  const { items } = useNavigation()
  return (
    <HStack
      as="nav"
      hideFrom="md"
      position="fixed"
      bottom="0"
      insetX="0"
      height={SHELL.BOTTOM_BAR_HEIGHT}
      pb="env(safe-area-inset-bottom)"
      justify="space-around"
      borderTopWidth="1px"
      borderColor="app.border"
      bg="app.glass"
      backdropFilter="blur(16px)"
      zIndex="sticky"
    >
      {items
        .filter((item) => item.isPrimary)
        .map((item) => (
          <NavLink key={item.key} href={item.resolvedHref} label={item.label} icon={item.icon} isActive={item.isActive} badge={item.badge} indicatorId={NAV_INDICATORS.BOTTOM_BAR} isCompact />
        ))}
    </HStack>
  )
}
