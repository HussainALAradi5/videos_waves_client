import { COMMENT_ENDPOINTS } from '@/config/api/endpoints/videos.endpoints'
import type { PageRequestDto } from '@/dtos/common/pagination/page-request.dto'
import type { CommentBodyRequestDto } from '@/dtos/videos/comment/comment-body-request.dto'
import type { CreateCommentRequestDto } from '@/dtos/videos/comment/create-comment-request.dto'
import type { Comment } from '@/interfaces/videos/comment/comment.interface'
import { deleteData, getPage, patchData, postData } from '../../api/api-request'

export const commentService = {
  list: (videoId: string, query: PageRequestDto, signal?: AbortSignal) =>
    getPage<Comment>(COMMENT_ENDPOINTS.root(videoId), query, signal),
  listReplies: (videoId: string, commentId: string, query: PageRequestDto, signal?: AbortSignal) =>
    getPage<Comment>(COMMENT_ENDPOINTS.replies(videoId, commentId), query, signal),
  create: (videoId: string, dto: CreateCommentRequestDto) => postData<Comment>(COMMENT_ENDPOINTS.root(videoId), dto),
  update: (videoId: string, commentId: string, dto: CommentBodyRequestDto) =>
    patchData<Comment>(COMMENT_ENDPOINTS.byId(videoId, commentId), dto),
  remove: (videoId: string, commentId: string) =>
    deleteData<{ message: string }>(COMMENT_ENDPOINTS.byId(videoId, commentId)),
  restore: (videoId: string, commentId: string) => patchData<Comment>(COMMENT_ENDPOINTS.restore(videoId, commentId)),
  approve: (videoId: string, commentId: string) => patchData<Comment>(COMMENT_ENDPOINTS.approve(videoId, commentId))
}
