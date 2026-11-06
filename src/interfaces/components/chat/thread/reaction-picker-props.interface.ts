export interface ReactionPickerProps {
  myReaction: string | null
  onReact: (emoji: string) => void
  /** Controlled from the bubble, so a right-click on the message opens the same bar. */
  isOpen: boolean
  onOpenChange: (isOpen: boolean) => void
}
