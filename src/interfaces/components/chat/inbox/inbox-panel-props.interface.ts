export interface InboxPanelProps {
  activeConversationId: string | null
  /** Carried into the chat link so the chosen chat opens ready to send the shared video. */
  sharedVideoId: string | null
}
