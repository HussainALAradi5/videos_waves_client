export const MEDIA_MESSAGES = {
  TYPE_NOT_ALLOWED: 'This file type is not allowed here.',
  TOO_LARGE: 'This file is too large.',
  TOO_MANY: (max: number) => `You can add up to ${max} files.`,
  DROP_HERE: 'Drop files here',
  DROP_IDLE: 'Drag files here, or click to choose',
  UPLOADING: 'Uploading',
  UPLOADED: 'Uploaded',
  FAILED: 'Upload failed',
  RETRY: 'Retry upload',
  REMOVE: 'Remove file'
} as const
