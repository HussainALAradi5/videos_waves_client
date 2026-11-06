'use client'

import { HStack } from '@chakra-ui/react'
import { SHELL } from '@/constants/common/navigation.constants'
import { BrandLogo } from './brand-logo'
import { ShellAccount } from './shell-account'

/** Phone header: the logo, theme, and account actions. */
export function TopBar() {
  return (
    <HStack
      as="header"
      hideFrom="md"
      position="sticky"
      top="0"
      height={SHELL.TOP_BAR_HEIGHT}
      px="4"
      justify="space-between"
      borderBottomWidth="1px"
      borderColor="app.border"
      bg="app.glass"
      backdropFilter="blur(16px)"
      zIndex="sticky"
    >
      <BrandLogo isCompact />
      <ShellAccount isInline />
    </HStack>
  )
}
