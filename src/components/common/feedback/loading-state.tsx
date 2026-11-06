import { Center, Spinner, Text, VStack } from '@chakra-ui/react'
import { MESSAGES } from '@/constants/common/messages.constants'
import { PALETTES } from '@/constants/common/theme.constants'

export function LoadingState() {
  return (
    <Center py="16" role="status" aria-live="polite">
      <VStack gap="3">
        <Spinner size="lg" colorPalette={PALETTES.BRAND} color="colorPalette.solid" />
        <Text color="fg.muted">{MESSAGES.COMMON.LOADING}</Text>
      </VStack>
    </Center>
  )
}
