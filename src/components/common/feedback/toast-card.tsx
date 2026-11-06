'use client'

import { useCallback } from 'react'
import { Box, HStack, Icon, Stack, Text } from '@chakra-ui/react'
import { LuX } from 'react-icons/lu'
import { TOAST_CLOSE_LABEL, TOAST_LOOKS, TOAST_MOTION } from '@/constants/common/toast.constants'
import { ToastType } from '@/enums/common/toast-type.enum'
import type { ToastCardProps } from '@/interfaces/components/common/feedback/toast-card-props.interface'
import { useToastTimer } from '@/hooks/common/toast/use-toast-timer'
import { toastStore } from '@/services/toast/toast-store.service'
import { GenericButton } from '@/components/common/buttons/generic-button'
import { GenericIconButton } from '@/components/common/buttons/generic-icon-button'
import { MotionBox } from '@/components/common/motion/motion-box'

/** One toast: a coloured icon, the text, an optional action, and a bar that empties as time runs out. */
export function ToastCard({ toast }: ToastCardProps) {
  const look = TOAST_LOOKS[toast.type]
  const close = useCallback(() => toastStore.dismiss(toast.id), [toast.id])
  const timer = useToastTimer(toast.durationMs, close)

  return (
    <MotionBox
      layout
      {...TOAST_MOTION}
      role={toast.type === ToastType.ERROR ? 'alert' : 'status'}
      pointerEvents="auto"
      position="relative"
      overflow="hidden"
      rounded="2xl"
      bg="app.surfaceRaised"
      borderWidth="1px"
      borderColor="app.border"
      shadow="toast"
      onMouseEnter={toast.isPausable ? timer.pause : undefined}
      onMouseLeave={toast.isPausable ? timer.resume : undefined}
      onFocus={toast.isPausable ? timer.pause : undefined}
      onBlur={toast.isPausable ? timer.resume : undefined}
    >
      <Box position="absolute" insetY="0" insetStart="0" width="1" bg={look.accent} />
      <HStack align="flex-start" gap="3" ps="4" pe="2" py="3">
        <Box display="grid" placeItems="center" boxSize="8" rounded="full" bg={`color-mix(in srgb, var(--chakra-colors-${look.accent.replace('.', '-')}) 16%, transparent)`} flexShrink={0}>
          <Icon color={look.accent} boxSize="4.5" aria-label={look.label}>
            <look.icon />
          </Icon>
        </Box>
        <Stack gap="0.5" flex="1" minW="0" pt="1">
          <Text fontWeight="semibold" fontSize="sm" lineHeight="short">
            {toast.title}
          </Text>
          {toast.description && (
            <Text fontSize="xs" color="fg.muted">
              {toast.description}
            </Text>
          )}
        </Stack>
        {toast.action && (
          <GenericButton
            size="xs"
            tone="secondary"
            onClick={() => {
              toast.action?.onClick()
              close()
            }}
          >
            {toast.action.label}
          </GenericButton>
        )}
        <GenericIconButton label={TOAST_CLOSE_LABEL} size="xs" onClick={close}>
          <LuX />
        </GenericIconButton>
      </HStack>
      <Box
        position="absolute"
        insetX="0"
        bottom="0"
        height="2px"
        bg={look.accent}
        opacity={0.55}
        transformOrigin="left"
        animation={`toastCountdown ${toast.durationMs}ms linear forwards`}
        style={{ animationPlayState: timer.isPaused ? 'paused' : 'running' }}
      />
    </MotionBox>
  )
}
