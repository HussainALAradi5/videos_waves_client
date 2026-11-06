import NextLink from 'next/link'
import { Link } from '@chakra-ui/react'
import type { AppLinkProps } from '@/interfaces/components/common/navigation/app-link-props.interface'

/** Chakra styling with Next.js client-side navigation. */
export function AppLink({ href, children, ...linkProps }: AppLinkProps) {
  return (
    <Link asChild {...linkProps}>
      <NextLink href={href}>{children}</NextLink>
    </Link>
  )
}
