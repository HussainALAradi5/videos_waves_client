'use client'

import NextLink from 'next/link'
import { Box, Button, Container, Flex, HStack } from '@chakra-ui/react'
import { LuHouse, LuUpload } from 'react-icons/lu'
import { MESSAGES } from '@/constants/common/messages.constants'
import { PAGE_ROUTES } from '@/constants/common/routes.constants'
import { LAYOUT } from '@/constants/common/theme.constants'
import { useAuth } from '@/hooks/users/auth/use-auth'
import { ColorModeButton } from '@/components/ui/color-mode-button'
import { BrandLogo } from './brand-logo'
import { NavGuestActions } from './nav-guest-actions'
import { NavAccountMenu } from './nav-account-menu'

const NAV_BUTTON = { variant: 'ghost', color: 'white', size: 'sm', _hover: { bg: 'whiteAlpha.200' } } as const

export function AppNavbar() {
  const { isAuthenticated } = useAuth()

  return (
    <Box as="header" bgGradient="to-r" gradientFrom="cyan.600" gradientTo="blue.700" position="sticky" top="0" zIndex="sticky">
      <Container maxW={LAYOUT.CONTENT_MAX_WIDTH} px={{ base: '4', md: '6' }}>
        <Flex h="16" align="center" justify="space-between" gap="2">
          <HStack gap={{ base: '1', md: '4' }}>
            <BrandLogo />
            <Button asChild {...NAV_BUTTON}>
              <NextLink href={PAGE_ROUTES.HOME} aria-label={MESSAGES.NAV.HOME}>
                <LuHouse />
                <Box as="span" display={{ base: 'none', md: 'inline' }}>
                  {MESSAGES.NAV.HOME}
                </Box>
              </NextLink>
            </Button>
            {isAuthenticated && (
              <Button asChild {...NAV_BUTTON}>
                <NextLink href={PAGE_ROUTES.UPLOAD} aria-label={MESSAGES.NAV.UPLOAD}>
                  <LuUpload />
                  <Box as="span" display={{ base: 'none', md: 'inline' }}>
                    {MESSAGES.NAV.UPLOAD}
                  </Box>
                </NextLink>
              </Button>
            )}
          </HStack>
          <HStack gap="1">
            <ColorModeButton />
            {isAuthenticated ? <NavAccountMenu /> : <NavGuestActions />}
          </HStack>
        </Flex>
      </Container>
    </Box>
  )
}
