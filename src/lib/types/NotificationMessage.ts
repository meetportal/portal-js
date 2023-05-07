import { Message } from './Message'

export interface NotificationMessage extends Message {
  /**
   * Determines the type of notification. This is used to identify the source of the notification.
   */
  type: 'app' | 'system'
  /**
   * Title of the notification
   */
  title: string
  /**
   * Text of the notification
   */
  text: string
  /**
   * Automatically populated by the Portal. Do not set. It will be overwritten.
   */
  iconUrl?: string
  /**
   * Timestamp of when the notification was created. If not set, it will be automatically set by the Portal.
   */
  createdAt?: Date
}
