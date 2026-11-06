'use client'

import NextLink from 'next/link'
import { Badge, Box, HStack, Icon, Text } from '@chakra-ui/react'
import type { NavLinkProps } from '@/interfaces/components/layout/shell/nav-link-props.interface'
import { MotionBox } from '@/components/common/motion/motion-box'
import { PRESS, TRANSITIONS } from '@/constants/common/motion.constants'

/**
 * One navigation entry: a pill that glides to the active item (shared layout id per menu), an
 * accent edge in the sidebar, an icon that fills in when active, a label on wide screens, and a badge.
 */
export function NavLink({ href, label, icon: IconComponent, isActive, badge, indicatorId, isCompact = false }: NavLinkProps) {
  return (
    <MotionBox whileHover={{ x: isCompact ? 0 : 3 }} whileTap={PRESS.whileTap}>
      <HStack
        asChild
        position="relative"
        gap="4"
        px="3"
        py="3"
        rounded="xl"
        color={isActive ? 'brand.fg' : 'fg.muted'}
        transition="color 0.2s"
        _hover={{ color: 'fg', bg: isActive ? undefined : 'app.surfaceHover' }}
        justify={isCompact ? 'center' : { base: 'center', xl: 'flex-start' }}
        aria-current={isActive ? 'page' : undefined}
      >
        <NextLink href={href} aria-label={label}>
          {isActive && (
            <MotionBox layoutId={indicatorId} transition={TRANSITIONS.spring} position="absolute" inset="0" rounded="xl" bg="brand.subtle" borderWidth="1px" borderColor="brand.muted">
              {!isCompact && <Box position="absolute" left="0" insetY="2.5" width="1" roundedRight="full" bgImage="{gradients.accent}" />}
            </MotionBox>
          )}
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
            <Text position="relative" fontWeight={isActive ? 'bold' : 'medium'} hideBelow="xl">
              {label}
            </Text>
          )}
        </NextLink>
      </HStack>
    </MotionBox>
  )
}
