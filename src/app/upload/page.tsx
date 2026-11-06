import type { Metadata } from 'next'
import { VideoUploadView } from '@/views/videos/video-upload-view'

export const metadata: Metadata = { title: 'Upload' }

export default function UploadPage() {
  return <VideoUploadView />
}
