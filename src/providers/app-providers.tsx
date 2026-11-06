'use client'

import { useState, type PropsWithChildren } from 'react'
import { ChakraProvider, defaultSystem } from '@chakra-ui/react'
import { QueryClientProvider } from '@tanstack/react-query'
import { ThemeProvider } from 'next-themes'
import { createQueryClient } from '@/config/query/query-client.config'
import { AppToaster } from '@/components/ui/app-toaster'
import { AuthProvider } from './auth/auth-provider'

export function AppProviders({ children }: PropsWithChildren) {
  // One query client per browser session, created lazily so server renders never share it.
  const [queryClient] = useState(createQueryClient)

  return (
    <ChakraProvider value={defaultSystem}>
      <ThemeProvider attribute="class" disableTransitionOnChange>
        <QueryClientProvider client={queryClient}>
          <AuthProvider>
            {children}
            <AppToaster />
          </AuthProvider>
        </QueryClientProvider>
      </ThemeProvider>
    </ChakraProvider>
  )
}
