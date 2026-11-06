'use client'

import { Portal, Stack } from '@chakra-ui/react'
import { AnimatePresence } from 'motion/react'
import { TOAST_MAX_VISIBLE, TOAST_REGION_LABEL } from '@/constants/common/toast.constants'
import { useToasts } from '@/hooks/common/toast/use-toasts'
import { ToastCard } from '@/components/common/feedback/toast-card'

/** The toast stack: top right on wide screens, full width on phones; newest at the bottom. */
export function AppToaster() {
  const toasts = useToasts().slice(0, TOAST_MAX_VISIBLE)
  return (
    <Portal>
      <Stack
        role="region"
        aria-label={TOAST_REGION_LABEL}
        aria-live="polite"
        position="fixed"
        zIndex="toast"
        top={{ base: '3', md: '5' }}
        insetEnd={{ base: '3', md: '5' }}
        insetStart={{ base: '3', md: 'auto' }}
        width={{ md: 'sm' }}
        gap="2.5"
        pointerEvents="none"
      >
        <AnimatePresence initial={false}>
          {toasts.map((toast) => (
            <ToastCard key={toast.id} toast={toast} />
          ))}
        </AnimatePresence>
      </Stack>
    </Portal>
  )
}
