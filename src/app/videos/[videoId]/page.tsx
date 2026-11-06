import { VideoDetailsView } from '@/views/videos/video-details-view'

export default async function VideoPage({ params }: PageProps<'/videos/[videoId]'>) {
  const { videoId } = await params
  return <VideoDetailsView videoId={videoId} />
}
