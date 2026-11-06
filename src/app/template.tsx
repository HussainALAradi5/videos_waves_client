'use client'

import type { PropsWithChildren } from 'react'
import { PageTransition } from '@/components/layout/shell/page-transition'

/** Next remounts templates on every navigation, so each page rises in on arrival. */
export default function Template({ children }: PropsWithChildren) {
  return <PageTransition>{children}</PageTransition>
}
