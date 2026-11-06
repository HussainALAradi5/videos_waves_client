/** Socket.IO event names (mirror the server). */
export enum ChatEvent {
  MESSAGE_NEW = 'message:new',
  MESSAGE_UPDATED = 'message:updated',
  MESSAGE_REACTION = 'message:reaction',
  CONVERSATION_UPDATED = 'conversation:updated',
  CONVERSATION_READ = 'conversation:read',
  TYPING = 'typing',
  PRESENCE = 'presence',
  NOTIFICATION_NEW = 'notification:new'
}
