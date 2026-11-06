import type { Metadata, Viewport } from 'next'
import type { PropsWithChildren } from 'react'
import { appConfig } from '@/config/app/app.config'
import { AppProviders } from '@/providers/app-providers'
import { AppNavbar } from '@/components/layout/navbar/app-navbar'
import { PageContainer } from '@/components/common/layout/page-container'

export const metadata: Metadata = {
  title: { default: appConfig.name, template: `%s · ${appConfig.name}` },
  description: appConfig.description
}

export const viewport: Viewport = { width: 'device-width', initialScale: 1 }

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    // next-themes sets the color-mode class on <html> before hydration.
    <html lang="en" suppressHydrationWarning>
      <body>
        <AppProviders>
          <AppNavbar />
          <PageContainer>{children}</PageContainer>
        </AppProviders>
      </body>
    </html>
  )
}
