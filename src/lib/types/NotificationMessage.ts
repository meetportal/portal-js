import { Message } from './Message'

export interface NotificationMessage extends Message {
  type: 'app' | 'system'
  title: string
  text: string
  /**
   * Automatically populated by the Portal. Do not set. It will be overwritten.
   */
  iconUrl?: string
  createdAt: Date
}
