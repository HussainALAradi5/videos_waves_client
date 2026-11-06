import type { LinkProps } from '@chakra-ui/react'

export interface AppLinkProps extends Omit<LinkProps, 'href' | 'asChild'> {
  href: string
}
