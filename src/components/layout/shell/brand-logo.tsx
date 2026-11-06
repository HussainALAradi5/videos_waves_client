import NextLink from 'next/link'
import { Box, HStack, Text } from '@chakra-ui/react'
import { appConfig } from '@/config/app/app.config'
import { PAGE_ROUTES } from '@/constants/common/routes.constants'
import type { BrandLogoProps } from '@/interfaces/components/layout/shell/brand-logo-props.interface'
import { WaveMark } from './wave-mark'

/** The wordmark: an animated wave mark plus the name in the brand gradient. */
export function BrandLogo({ isCompact = false }: BrandLogoProps) {
  return (
    <HStack asChild gap="2.5" _hover={{ textDecoration: 'none' }}>
      <NextLink href={PAGE_ROUTES.HOME} aria-label={appConfig.name}>
        <WaveMark />
        {!isCompact && (
          <Box hideBelow="xl">
            <Text fontWeight="black" fontSize="xl" letterSpacing="tight" bgImage="{gradients.brand}" bgClip="text" color="transparent">
              {appConfig.name}
            </Text>
          </Box>
        )}
      </NextLink>
    </HStack>
  )
}
