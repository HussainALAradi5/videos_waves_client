'use client'

import { useState, type KeyboardEvent } from 'react'
import type { InlineEditorProps } from '@/interfaces/components/common/forms/inline-editor-props.interface'
import { useAsyncAction } from './use-async-action'

/** State and keyboard handling for InlineEditor. */
export const useInlineEditor = ({ initialValue, onSave, onCancel }: InlineEditorProps) => {
  const [value, setValue] = useState(initialValue)
  const trimmed = value.trim()
  const canSave = trimmed.length > 0 && trimmed !== initialValue.trim()
  const { run: save, isPending } = useAsyncAction(async () => {
    if (canSave) await onSave(trimmed)
  })

  const onKeyDown = (event: KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === 'Escape') onCancel()
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault()
      void save()
    }
  }

  return { value, setValue, save, onKeyDown, canSave: canSave && !isPending }
}
