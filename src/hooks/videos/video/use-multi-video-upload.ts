'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useQueryClient } from '@tanstack/react-query'
import { QUERY_KEYS } from '@/constants/common/query-keys.constants'
import { PAGE_ROUTES } from '@/constants/common/routes.constants'
import { VIDEO_MESSAGES } from '@/constants/videos/video/video-messages.constants'
import { VIDEO_UPLOAD } from '@/constants/videos/video/video-upload.constants'
import { MediaKind } from '@/enums/media/media/media-kind.enum'
import type { UploadDraft } from '@/interfaces/videos/video/upload-draft.interface'
import { videoService } from '@/services/videos/video/video.service'
import { useMultiFileQueue } from '@/hooks/common/use-multi-file-queue'
import { useAuth } from '@/hooks/users/auth/use-auth'
import { notifyError, notifySuccess } from '@/utilities/toast/notify.utility'

const titleFromFile = (file: File): string => file.name.replace(/\.[^.]+$/, '').replace(/[-_]+/g, ' ').trim()

/** Several videos at once: each gets a title (prefilled from its file name), uploads to the CDN, then publishes. */
export const useMultiVideoUpload = () => {
  const queue = useMultiFileQueue({ kind: MediaKind.VIDEO, maxFiles: VIDEO_UPLOAD.MAX_FILES })
  const [drafts, setDrafts] = useState<Record<string, UploadDraft>>({})
  const router = useRouter()
  const queryClient = useQueryClient()
  const { user } = useAuth()

  const draftOf = (key: string, file: File): UploadDraft => drafts[key] ?? { title: titleFromFile(file), description: '' }
  const setDraft = (key: string, file: File, changes: Partial<UploadDraft>) =>
    setDrafts((current) => ({ ...current, [key]: { ...draftOf(key, file), ...changes } }))
  const isReady = queue.items.length > 0 && queue.items.every((item) => draftOf(item.key, item.file).title.trim().length > 0)

  const publishAll = async () => {
    if (!isReady) return notifyError(new Error(VIDEO_MESSAGES.TITLE_REQUIRED))
    const uploaded = await queue.uploadAll()
    const done = queue.items.filter((item) => uploaded.some((media) => media.id === item.media?.id) || item.media)
    let published = 0
    for (const [index, media] of uploaded.entries()) {
      const item = done[index] ?? queue.items[index]
      const draft = draftOf(item.key, item.file)
      await videoService.create({ mediaId: media.id, title: draft.title.trim(), description: draft.description.trim() })
      published += 1
    }
    if (published === 0) return
    notifySuccess(VIDEO_MESSAGES.PUBLISHED(published))
    queue.clear()
    await queryClient.invalidateQueries({ queryKey: QUERY_KEYS.videos })
    router.push(user ? PAGE_ROUTES.profile(user.userName) : PAGE_ROUTES.HOME)
  }
  return { queue, draftOf, setDraft, isReady, publishAll }
}
