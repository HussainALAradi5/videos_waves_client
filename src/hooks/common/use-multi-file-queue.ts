'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { UploadStatus } from '@/enums/media/media/upload-status.enum'
import type { UploadItem } from '@/interfaces/media/media/upload-item.interface'
import type { UseMultiFileQueueOptions } from '@/interfaces/hooks/common/use-multi-file-queue-options.interface'
import { mediaUploadService } from '@/services/media/media/media-upload.service'
import { getErrorMessage } from '@/utilities/errors/api-error.utility'

let nextKey = 0
const toItem = (file: File): UploadItem => ({
  key: `upload-${(nextKey += 1)}`,
  file,
  previewUrl: URL.createObjectURL(file),
  progress: 0,
  status: UploadStatus.QUEUED,
  error: null,
  media: null
})

/**
 * A queue of files uploaded straight to the CDN one at a time, each with its own progress, error,
 * and retry. Removing an uploaded file also discards it on the server.
 */
export const useMultiFileQueue = ({ kind, maxFiles }: UseMultiFileQueueOptions) => {
  const [items, setItems] = useState<UploadItem[]>([])
  // Callbacks read the latest queue through this ref, so they stay stable while items change.
  const itemsRef = useRef(items)
  useEffect(() => {
    itemsRef.current = items
  }, [items])

  const patch = useCallback((key: string, changes: Partial<UploadItem>) => {
    setItems((current) => current.map((item) => (item.key === key ? { ...item, ...changes } : item)))
  }, [])

  const addFiles = useCallback(
    (files: File[]) => setItems((current) => [...current, ...files.slice(0, maxFiles - current.length).map(toItem)]),
    [maxFiles]
  )

  const uploadOne = useCallback(
    async (item: UploadItem) => {
      patch(item.key, { status: UploadStatus.UPLOADING, progress: 0, error: null })
      try {
        const media = await mediaUploadService.upload(item.file, kind, (progress) => patch(item.key, { progress }))
        patch(item.key, { status: UploadStatus.DONE, progress: 100, media })
        return media
      } catch (error) {
        patch(item.key, { status: UploadStatus.FAILED, error: getErrorMessage(error) })
        return null
      }
    },
    [kind, patch]
  )

  /** Uploads every file not yet done; resolves to the media of all finished files, in order. */
  const uploadAll = useCallback(async () => {
    const results = []
    for (const item of itemsRef.current) {
      results.push(item.status === UploadStatus.DONE ? item.media : await uploadOne(item))
    }
    return results.filter((media) => media !== null)
  }, [uploadOne])

  const remove = useCallback((key: string) => {
    const item = itemsRef.current.find((candidate) => candidate.key === key)
    if (!item) return
    URL.revokeObjectURL(item.previewUrl)
    if (item.media) void mediaUploadService.discard(item.media.id).catch(() => undefined)
    setItems((current) => current.filter((candidate) => candidate.key !== key))
  }, [])

  /** Forgets the queue after the files were used (sent or published). */
  const clear = useCallback(() => {
    itemsRef.current.forEach((item) => URL.revokeObjectURL(item.previewUrl))
    setItems([])
  }, [])

  useEffect(() => () => itemsRef.current.forEach((item) => URL.revokeObjectURL(item.previewUrl)), [])

  const isUploading = items.some((item) => item.status === UploadStatus.UPLOADING)
  return { items, addFiles, uploadAll, retry: uploadOne, remove, clear, isUploading, isFull: items.length >= maxFiles }
}
