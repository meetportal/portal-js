export interface StoreOptions {
  /**
   * Determines if the store is shared between applications
   */
  shared?: boolean
  /**
   * Determines if the store is persistent between sessions
   * @default false
   */
  peristent?: boolean
}
