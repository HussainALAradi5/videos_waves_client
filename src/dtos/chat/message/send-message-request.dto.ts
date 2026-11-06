export interface SendMessageRequestDto {
  body?: string
  attachmentIds?: string[]
  voiceNoteId?: string
  sharedVideoId?: string
  replyToId?: string
}
