'use client'

import type { PropsWithChildren } from 'react'
import { Box, Container } from '@chakra-ui/react'
import { usePathname } from 'next/navigation'
import { AnimatePresence } from 'motion/react'
import { SHELL } from '@/constants/common/navigation.constants'
import { LAYOUT } from '@/constants/common/theme.constants'
import { Animated } from '@/components/common/motion/animated'
import { WaveBackground } from '@/components/common/waves/wave-background'
import { BottomTabBar } from './bottom-tab-bar'
import { SideNav } from './side-nav'
import { TopBar } from './top-bar'

/** Sidebar (desktop) or top and bottom bars (phone) around animated page content, over the waves. */
export function AppShell({ children }: PropsWithChildren) {
  const pathname = usePathname()
  return (
    <>
      <WaveBackground />
      <SideNav />
      <TopBar />
      <Box as="main" position="relative" zIndex="1" ml={SHELL.SIDEBAR_WIDTH} pb={{ base: SHELL.BOTTOM_BAR_HEIGHT, md: '0' }}>
        <Container maxW={LAYOUT.CONTENT_MAX_WIDTH} px={{ base: '4', md: '8' }} py={{ base: '4', md: '8' }}>
          <AnimatePresence mode="wait">
            <Animated key={pathname} variant="fadeUp">
              {children}
            </Animated>
          </AnimatePresence>
        </Container>
      </Box>
      <BottomTabBar />
    </>
  )
}
