'use client'

import NextLink from 'next/link'
import { Badge, Box, HStack, Icon, Text } from '@chakra-ui/react'
import type { NavLinkProps } from '@/interfaces/components/layout/shell/nav-link-props.interface'
import { MotionBox } from '@/components/common/motion/motion-box'
import { PRESS } from '@/constants/common/motion.constants'

/** One navigation entry: an icon that fills in when active, a label on wide screens, and a badge. */
export function NavLink({ href, label, icon: IconComponent, isActive, badge, isCompact = false }: NavLinkProps) {
  return (
    <MotionBox whileHover={{ x: isCompact ? 0 : 2 }} whileTap={PRESS.whileTap}>
      <HStack
        asChild
        gap="4"
        px="3"
        py="3"
        rounded="xl"
        color={isActive ? 'fg' : 'fg.muted'}
        bg={isActive ? 'bg.muted' : 'transparent'}
        _hover={{ bg: 'bg.muted', color: 'fg' }}
        justify={isCompact ? 'center' : { base: 'center', xl: 'flex-start' }}
        aria-current={isActive ? 'page' : undefined}
      >
        <NextLink href={href} aria-label={label}>
          <Box position="relative">
            <Icon size="lg" strokeWidth={isActive ? 2.6 : 2}>
              <IconComponent />
            </Icon>
            {badge > 0 && (
              <Badge position="absolute" top="-2" right="-3" size="xs" rounded="full" colorPalette="red" variant="solid">
                {badge > 99 ? '99+' : badge}
              </Badge>
            )}
          </Box>
          {!isCompact && (
            <Text fontWeight={isActive ? 'bold' : 'medium'} hideBelow="xl">
              {label}
            </Text>
          )}
        </NextLink>
      </HStack>
    </MotionBox>
  )
}
