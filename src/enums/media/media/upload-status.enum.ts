/** Where one file in a multi-file upload is. */
export enum UploadStatus {
  QUEUED = 'queued',
  UPLOADING = 'uploading',
  DONE = 'done',
  FAILED = 'failed'
}
