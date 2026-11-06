export const MEDIA_MESSAGES = {
  TYPE_NOT_ALLOWED: 'This file type is not allowed here.',
  TOO_LARGE: 'This file is too large.',
  TOO_MANY: (max: number) => `You can add up to ${max} files.`,
  FILE_TOO_LARGE: (name: string, limit: string) => `"${name}" is too large. The limit is ${limit}.`,
  FILE_TYPE_NOT_ALLOWED: (name: string) => `"${name}" is not a supported file type here.`,
  SKIPPED: (count: number) => `${count} file${count === 1 ? ' was' : 's were'} not added`,
  DROP_HERE: 'Drop files here',
  DROP_IDLE: 'Drag files here, or click to choose',
  UPLOADING: 'Uploading',
  UPLOADED: 'Uploaded',
  FAILED: 'Upload failed',
  RETRY: 'Retry upload',
  REMOVE: 'Remove file'
} as const
