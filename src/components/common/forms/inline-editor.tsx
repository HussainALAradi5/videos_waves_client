'use client'

import { HStack, Stack, Text, Textarea } from '@chakra-ui/react'
import type { InlineEditorProps } from '@/interfaces/components/common/forms/inline-editor-props.interface'
import { useInlineEditor } from '@/hooks/common/use-inline-editor'
import { GenericButton } from '../buttons/generic-button'
import { Animated } from '../motion/animated'

/** Edit text in place: expands in, Enter saves (Shift+Enter for a new line), Escape cancels. */
export function InlineEditor(props: InlineEditorProps) {
  const { maxLength, onCancel, saveLabel, cancelLabel, placeholder } = props
  const { value, setValue, save, onKeyDown, canSave } = useInlineEditor(props)

  return (
    <Animated variant="collapse" overflow="hidden">
      <Stack gap="2" pt="1">
        <Textarea
          value={value}
          onChange={(event) => setValue(event.target.value)}
          onKeyDown={onKeyDown}
          maxLength={maxLength}
          placeholder={placeholder}
          autoresize
          autoFocus
          rounded="xl"
          bg="app.surface"
        />
        <HStack justify="space-between">
          <Text fontSize="xs" color="fg.muted">
            {value.length}/{maxLength}
          </Text>
          <HStack gap="2">
            <GenericButton size="sm" tone="ghost" onClick={onCancel}>
              {cancelLabel}
            </GenericButton>
            <GenericButton size="sm" onClick={save} disabled={!canSave}>
              {saveLabel}
            </GenericButton>
          </HStack>
        </HStack>
      </Stack>
    </Animated>
  )
}
