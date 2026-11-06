import { COMMENT_ENDPOINTS } from '@/config/api/endpoints/videos.endpoints'
import type { PageRequestDto } from '@/dtos/common/pagination/page-request.dto'
import type { CommentBodyRequestDto } from '@/dtos/videos/comment/comment-body-request.dto'
import type { Comment } from '@/interfaces/videos/comment/comment.interface'
import { deleteData, getPage, patchData, postData } from '../../api/api-request'

export const commentService = {
  list: (videoId: string, query: PageRequestDto, signal?: AbortSignal) =>
    getPage<Comment>(COMMENT_ENDPOINTS.root(videoId), query, signal),
  create: (videoId: string, dto: CommentBodyRequestDto) => postData<Comment>(COMMENT_ENDPOINTS.root(videoId), dto),
  update: (videoId: string, commentId: string, dto: CommentBodyRequestDto) =>
    patchData<Comment>(COMMENT_ENDPOINTS.byId(videoId, commentId), dto),
  remove: (videoId: string, commentId: string) =>
    deleteData<{ message: string }>(COMMENT_ENDPOINTS.byId(videoId, commentId))
}
