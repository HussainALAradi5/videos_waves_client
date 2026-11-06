import axios from 'axios'
import { apiConfig } from '@/config/api/api.config'
import { MEDIA_ENDPOINTS } from '@/config/api/endpoints/media.endpoints'
import { MEDIA_MESSAGES } from '@/constants/media/media/media-messages.constants'
import type { MediaKind } from '@/enums/media/media/media-kind.enum'
import type { Media } from '@/interfaces/media/media/media.interface'
import type { StoredFile } from '@/interfaces/media/media/stored-file.interface'
import type { UploadSignature } from '@/interfaces/media/media/upload-signature.interface'
import { toPercent } from '@/utilities/format/percent.utility'
import { deleteData, postData } from '../../api/api-request'

// A bare client: uploads go straight to the storage provider and must never carry our API token.
const providerClient = axios.create({ timeout: apiConfig.uploadTimeoutMs })

const assertAllowed = (file: File, signature: UploadSignature): void => {
  if (!signature.mimeTypes.includes(file.type)) throw new Error(MEDIA_MESSAGES.TYPE_NOT_ALLOWED)
  if (file.size > signature.maxBytes) throw new Error(MEDIA_MESSAGES.TOO_LARGE)
}

const toProviderForm = (file: File, signature: UploadSignature): FormData => {
  const form = new FormData()
  form.append('fileName', file.name)
  form.append('folder', signature.folder)
  form.append('token', signature.token)
  form.append('expire', String(signature.expire))
  form.append('signature', signature.signature)
  form.append('publicKey', signature.publicKey)
  form.append('isPrivateFile', String(signature.isPrivateFile))
  form.append('useUniqueFileName', 'true')
  form.append('file', file)
  return form
}

/**
 * Uploads one file without it ever passing through our server: sign, upload to the provider
 * (ImageKit, or the local stand-in) with progress, then register so the server verifies it.
 */
const upload = async (file: File, kind: MediaKind, onProgress: (percent: number) => void, signal?: AbortSignal): Promise<Media> => {
  const signature = await postData<UploadSignature>(MEDIA_ENDPOINTS.SIGNATURE, { kind })
  assertAllowed(file, signature)
  const stored = await providerClient.post<StoredFile>(signature.uploadUrl, toProviderForm(file, signature), {
    signal,
    onUploadProgress: (event) => onProgress(toPercent(event.loaded, event.total))
  })
  return postData<Media>(MEDIA_ENDPOINTS.ROOT, { fileId: stored.data.fileId, kind, originalName: file.name })
}

export const mediaUploadService = {
  upload,
  /** Drops an upload that was never used (removed from the picker before sending). */
  discard: (mediaId: string) => deleteData<{ message: string }>(MEDIA_ENDPOINTS.byId(mediaId))
}
