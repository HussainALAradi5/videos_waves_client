'use client'

import { Box, Stack } from '@chakra-ui/react'
import { SHELL } from '@/constants/common/navigation.constants'
import { useNavigation } from '@/hooks/common/use-navigation'
import { BrandLogo } from './brand-logo'
import { NavLink } from './nav-link'
import { ShellAccount } from './shell-account'

/** Desktop and tablet navigation: icons on tablets, icons with labels on wide screens. */
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
      py="6"
      borderRightWidth="1px"
      borderColor="app.border"
      bg="app.glass"
      backdropFilter="blur(16px)"
      zIndex="sticky"
    >
      <Stack height="full" gap="8">
        <Box px="2">
          <BrandLogo />
        </Box>
        <Stack gap="1" flex="1">
          {items.map((item) => (
            <NavLink key={item.key} href={item.resolvedHref} label={item.label} icon={item.icon} isActive={item.isActive} badge={item.badge} />
          ))}
        </Stack>
        <ShellAccount />
      </Stack>
    </Box>
  )
}
