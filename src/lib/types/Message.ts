export interface Message {
  /**
   * Unique identifier for the message. Generated ID. Do not set. It will be overwritten.
   * If you need to track a message, use the externalId property.
   */
  id?: string
  /**
   * Determines the destination of the message. Generally, this is automatically set by the Portal.
   */
  appId?: string
  /**
   * External identifier for the message. This is used to track messages.
   */
  externalId?: string
  /**
   * Group identifier for the message. This is used to group messages.
   */
  groupId?: string
  /**
   * Payload for the message. This is the data that is sent to the application.
   */
  data?: any
}
