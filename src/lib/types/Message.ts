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
  externalId?: string
  groupId?: string
  data?: any
}
