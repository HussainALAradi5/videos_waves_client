import { apiConfig } from '@/config/api/api.config'
import { VIDEO_ENDPOINTS } from '@/config/api/endpoints/videos.endpoints'
import type { VideoQueryDto } from '@/dtos/videos/video/video-query.dto'
import type { VideoDetailsRequestDto } from '@/dtos/videos/video/video-details-request.dto'
import type { Video } from '@/interfaces/videos/video/video.interface'
import type { VideoLikeState } from '@/interfaces/videos/video/video-like-state.interface'
import { deleteData, getData, getPage, patchData, postData, putData } from '../../api/api-request'

const UPLOAD_FIELD = 'file'
const PERCENT = 100

const toUploadForm = (file: File, details: VideoDetailsRequestDto): FormData => {
  const form = new FormData()
  form.append(UPLOAD_FIELD, file)
  form.append('title', details.title)
  form.append('description', details.description)
  return form
}

export const videoService = {
  list: (query: VideoQueryDto, signal?: AbortSignal) => getPage<Video>(VIDEO_ENDPOINTS.ROOT, query, signal),
  getById: (videoId: string, signal?: AbortSignal) => getData<Video>(VIDEO_ENDPOINTS.byId(videoId), { signal }),
  upload: (file: File, details: VideoDetailsRequestDto, onProgress: (percent: number) => void) =>
    postData<Video>(VIDEO_ENDPOINTS.ROOT, toUploadForm(file, details), {
      timeout: apiConfig.uploadTimeoutMs,
      onUploadProgress: (event) => onProgress(event.total ? Math.round((event.loaded * PERCENT) / event.total) : 0)
    }),
  update: (videoId: string, dto: VideoDetailsRequestDto) => patchData<Video>(VIDEO_ENDPOINTS.byId(videoId), dto),
  remove: (videoId: string) => deleteData<{ message: string }>(VIDEO_ENDPOINTS.byId(videoId)),
  recordView: (videoId: string) => postData<{ videoId: string }>(VIDEO_ENDPOINTS.views(videoId)),
  like: (videoId: string) => putData<VideoLikeState>(VIDEO_ENDPOINTS.like(videoId)),
  unlike: (videoId: string) => deleteData<VideoLikeState>(VIDEO_ENDPOINTS.like(videoId))
}
