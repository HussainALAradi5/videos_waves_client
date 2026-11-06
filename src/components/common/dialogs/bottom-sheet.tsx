'use client'

import { Box, CloseButton, Drawer, Portal } from '@chakra-ui/react'
import type { BottomSheetProps } from '@/interfaces/components/common/dialogs/bottom-sheet-props.interface'

/** Slides up from the bottom on phones and from the right on wider screens (details, group info). */
export function BottomSheet({ isOpen, onClose, title, footer, children }: BottomSheetProps) {
  return (
    <Drawer.Root open={isOpen} onOpenChange={(details) => !details.open && onClose()} placement={{ base: 'bottom', md: 'end' }} size={{ base: 'full', md: 'sm' }}>
      <Portal>
        <Drawer.Backdrop backdropFilter="blur(4px)" />
        <Drawer.Positioner>
          <Drawer.Content roundedTop={{ base: '3xl', md: 'none' }} maxH={{ base: '85dvh', md: 'full' }} bg="app.surfaceRaised">
            <Box mx="auto" mt="2" width="10" height="1" rounded="full" bg="border.emphasized" hideFrom="md" />
            <Drawer.Header>
              <Drawer.Title>{title}</Drawer.Title>
            </Drawer.Header>
            <Drawer.Body>{children}</Drawer.Body>
            {footer && <Drawer.Footer>{footer}</Drawer.Footer>}
            <Drawer.CloseTrigger asChild>
              <CloseButton size="sm" rounded="full" />
            </Drawer.CloseTrigger>
          </Drawer.Content>
        </Drawer.Positioner>
      </Portal>
    </Drawer.Root>
  )
}
