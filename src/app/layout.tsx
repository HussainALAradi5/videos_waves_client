import type { Metadata, Viewport } from 'next'
import type { PropsWithChildren } from 'react'
import { Inter } from 'next/font/google'
import { appConfig } from '@/config/app/app.config'
import { AppProviders } from '@/providers/app-providers'
import { AppShell } from '@/components/layout/shell/app-shell'

const inter = Inter({ subsets: ['latin'], variable: '--font-sans', display: 'swap' })

export const metadata: Metadata = {
  title: { default: appConfig.name, template: `%s · ${appConfig.name}` },
  description: appConfig.description
}

export const viewport: Viewport = { width: 'device-width', initialScale: 1, viewportFit: 'cover' }

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    // next-themes sets the color-mode class on <html> before hydration.
    <html lang="en" suppressHydrationWarning className={inter.variable}>
      <body>
        <AppProviders>
          <AppShell>{children}</AppShell>
        </AppProviders>
      </body>
    </html>
  )
}
