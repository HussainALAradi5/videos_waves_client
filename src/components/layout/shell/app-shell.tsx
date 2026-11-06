'use client'

import type { PropsWithChildren } from 'react'
import { Box, Container } from '@chakra-ui/react'
import { SHELL } from '@/constants/common/navigation.constants'
import { LAYOUT } from '@/constants/common/theme.constants'
import { WaveBackground } from '@/components/common/waves/wave-background'
import { BottomTabBar } from './bottom-tab-bar'
import { SideNav } from './side-nav'
import { TopBar } from './top-bar'

/** Sidebar (desktop) or top and bottom bars (phone) around the page, over the waves (pages animate in via app/template). */
export function AppShell({ children }: PropsWithChildren) {
  return (
    <>
      <WaveBackground />
      <SideNav />
      <TopBar />
      <Box as="main" position="relative" zIndex="1" ml={SHELL.SIDEBAR_WIDTH} pb={{ base: SHELL.BOTTOM_BAR_HEIGHT, md: '0' }}>
        <Container maxW={LAYOUT.CONTENT_MAX_WIDTH} px={{ base: '4', md: '8' }} py={{ base: '4', md: '8' }}>
          {children}
        </Container>
      </Box>
      <BottomTabBar />
    </>
  )
}
