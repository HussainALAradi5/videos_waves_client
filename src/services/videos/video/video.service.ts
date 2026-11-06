import { VIDEO_ENDPOINTS } from '@/config/api/endpoints/videos.endpoints'
import type { CreateVideoRequestDto } from '@/dtos/videos/video/create-video-request.dto'
import type { VideoQueryDto } from '@/dtos/videos/video/video-query.dto'
import type { VideoDetailsRequestDto } from '@/dtos/videos/video/video-details-request.dto'
import type { Video } from '@/interfaces/videos/video/video.interface'
import type { VideoLikeState } from '@/interfaces/videos/video/video-like-state.interface'
import { deleteData, getData, getPage, patchData, postData, putData } from '../../api/api-request'

export const videoService = {
  list: (query: VideoQueryDto, signal?: AbortSignal) => getPage<Video>(VIDEO_ENDPOINTS.ROOT, query, signal),
  getById: (videoId: string, signal?: AbortSignal) => getData<Video>(VIDEO_ENDPOINTS.byId(videoId), { signal }),
  /** Publishes media uploaded with mediaUploadService. */
  create: (dto: CreateVideoRequestDto) => postData<Video>(VIDEO_ENDPOINTS.ROOT, dto),
  update: (videoId: string, dto: VideoDetailsRequestDto) => patchData<Video>(VIDEO_ENDPOINTS.byId(videoId), dto),
  remove: (videoId: string) => deleteData<{ message: string }>(VIDEO_ENDPOINTS.byId(videoId)),
  recordView: (videoId: string) => postData<{ videoId: string }>(VIDEO_ENDPOINTS.views(videoId)),
  like: (videoId: string) => putData<VideoLikeState>(VIDEO_ENDPOINTS.like(videoId)),
  unlike: (videoId: string) => deleteData<VideoLikeState>(VIDEO_ENDPOINTS.like(videoId))
}
