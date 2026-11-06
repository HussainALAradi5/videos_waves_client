import { Stack, Text } from '@chakra-ui/react'
import type { ProfileStatProps } from '@/interfaces/components/users/profile/profile-stat-props.interface'
import { AnimatedCount } from '@/components/common/counters/animated-count'

export function ProfileStat({ value, label, onClick }: ProfileStatProps) {
  return (
    <Stack as={onClick ? 'button' : 'div'} gap="0" onClick={onClick} cursor={onClick ? 'pointer' : 'default'} _hover={onClick ? { opacity: 0.8 } : undefined}>
      <Text fontWeight="bold" fontSize="lg">
        <AnimatedCount value={value} />
      </Text>
      <Text fontSize="sm" color="fg.muted">
        {label}
      </Text>
    </Stack>
  )
}
