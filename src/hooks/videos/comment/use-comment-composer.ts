'use client'

import { useState } from 'react'
import type { Comment } from '@/interfaces/videos/comment/comment.interface'
import { isValidCommentContent } from '@/validations/videos/comment/comment-form.validation'
import { useCommentActions } from './use-comment-actions'

/** The composer text and an optional comment being replied to. */
export const useCommentComposer = (videoId: string) => {
  const { create } = useCommentActions(videoId)
  const [content, setContent] = useState('')
  const [replyTo, setReplyTo] = useState<Comment | null>(null)

  const submit = async () => {
    if (!isValidCommentContent(content)) return
    await create.mutateAsync({ content: content.trim(), parentId: replyTo?.id })
    setContent('')
    setReplyTo(null)
  }
  return { content, setContent, replyTo, setReplyTo, submit, canSubmit: isValidCommentContent(content) }
}
