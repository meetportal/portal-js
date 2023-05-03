export interface Message {
  /**
   * Unique identifier for the message. Generated ID. Do not set. It will be overwritten.
   * If you need to track a message, use the externalId property.
   */
  id?: string
  appId: string
  externalId?: string
  groupId?: string
  data?: any
}
