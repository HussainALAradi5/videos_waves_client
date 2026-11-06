/** Strings for the redesigned video screens (older ones stay in MESSAGES.VIDEOS). */
export const VIDEO_MESSAGES = {
  FOR_YOU: 'For you',
  FOLLOWING: 'Following',
  FOLLOWING_EMPTY_TITLE: 'Nothing here yet',
  FOLLOWING_EMPTY_DESCRIPTION: 'Follow people to see their newest videos here.',
  OPTIONS: 'Video options',
  COPY_LINK: 'Copy link',
  LINK_COPIED: 'Link copied',
  SHARE_IN_CHAT: 'Send in a message',
  VIEWS: (count: string) => `${count} views`,
  UPLOAD_TITLE: 'Share your waves',
  UPLOAD_DESCRIPTION: 'Add up to 5 videos at once. Each one gets its own title and uploads straight to the CDN.',
  UPLOAD_HINT: (maxMb: number) => `MP4, WebM, or MOV, up to ${maxMb} MB each`,
  PUBLISH_ALL: (count: number) => (count === 1 ? 'Publish video' : `Publish ${count} videos`),
  PUBLISHED: (count: number) => (count === 1 ? 'Your video is live' : `${count} videos are live`),
  TITLE_LABEL: 'Title',
  DESCRIPTION_LABEL: 'Description',
  TITLE_REQUIRED: 'Give every video a title.'
} as const
