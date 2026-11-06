/** What the server returns before a direct upload to the storage provider. */
export interface UploadSignature {
  provider: 'imagekit' | 'local'
  uploadUrl: string
  publicKey: string
  token: string
  expire: number
  signature: string
  folder: string
  isPrivateFile: boolean
  maxBytes: number
  mimeTypes: string[]
}
