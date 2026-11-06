'use client'

import { useState, type PropsWithChildren } from 'react'
import { ChakraProvider } from '@chakra-ui/react'
import { QueryClientProvider } from '@tanstack/react-query'
import { ThemeProvider } from 'next-themes'
import { MotionConfig } from 'motion/react'
import { appSystem } from '@/config/theme/system.config'
import { createQueryClient } from '@/config/query/query-client.config'
import { AppToaster } from '@/components/ui/app-toaster'
import { AuthProvider } from './auth/auth-provider'
import { RealtimeEffects } from './realtime/realtime-effects'
import { SettingsEffects } from './settings/settings-effects'

export function AppProviders({ children }: PropsWithChildren) {
  // One query client per browser session, created lazily so server renders never share it.
  const [queryClient] = useState(createQueryClient)

  return (
    <ChakraProvider value={appSystem}>
      <ThemeProvider attribute="class" disableTransitionOnChange>
        <QueryClientProvider client={queryClient}>
          {/* "user" follows the OS reduce-motion setting for every motion animation. */}
          <MotionConfig reducedMotion="user">
            <AuthProvider>
              <SettingsEffects />
              <RealtimeEffects />
              {children}
              <AppToaster />
            </AuthProvider>
          </MotionConfig>
        </QueryClientProvider>
      </ThemeProvider>
    </ChakraProvider>
  )
}
