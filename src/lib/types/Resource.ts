export interface Resource {
  /**
   * Unique identifier for the resource in the host application.
   */
  id: string
  /**
   * Type of resource. This is used for filtering subscriptions.
   */
  type: string
  /**
   * Payload for the resource. This is the data that is sent to the application.
   */
  data?: any
}
