'use client'

import { useState } from 'react'
import { isValidCommentContent } from '@/validations/videos/comment/comment-form.validation'
import { useCommentActions } from './use-comment-actions'

export const useCommentComposer = (videoId: string) => {
  const { create } = useCommentActions(videoId)
  const [content, setContent] = useState('')

  const submit = () => {
    if (!isValidCommentContent(content)) return
    create.mutate(content.trim(), { onSuccess: () => setContent('') })
  }

  return { content, setContent, submit, canSubmit: isValidCommentContent(content), isPosting: create.isPending }
}
