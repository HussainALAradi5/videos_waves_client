'use client'

import { Box, Stack, Text } from '@chakra-ui/react'
import { MESSAGES } from '@/constants/common/messages.constants'
import { NAV_INDICATORS, SHELL } from '@/constants/common/navigation.constants'
import { useNavigation } from '@/hooks/common/use-navigation'
import { BrandLogo } from './brand-logo'
import { NavLink } from './nav-link'
import { SidebarAccount } from './sidebar-account'

/** Desktop and tablet navigation: an icon rail on tablets; logo, labelled menu, and account card on wide screens. */
export function SideNav() {
  const { items } = useNavigation()
  return (
    <Box
      as="nav"
      hideBelow="md"
      position="fixed"
      insetY="0"
      left="0"
      width={SHELL.SIDEBAR_WIDTH}
      px="3"
      py="5"
      borderRightWidth="1px"
      borderColor="app.border"
      bg="app.glass"
      backdropFilter="blur(16px)"
      zIndex="sticky"
    >
      <Stack height="full" gap="6">
        <Box px={{ md: '1.5', xl: '3' }} py="1">
          <BrandLogo />
        </Box>
        <Stack gap="1" flex="1" overflowY="auto">
          <Text hideBelow="xl" px="3" pb="1" fontSize="xs" fontWeight="semibold" letterSpacing="wider" textTransform="uppercase" color="fg.subtle">
            {MESSAGES.NAV.MENU}
          </Text>
          {items.map((item) => (
            <NavLink
              key={item.key}
              href={item.resolvedHref}
              label={item.label}
              icon={item.icon}
              isActive={item.isActive}
              badge={item.badge}
              indicatorId={NAV_INDICATORS.SIDEBAR}
            />
          ))}
        </Stack>
        <SidebarAccount />
      </Stack>
    </Box>
  )
}
