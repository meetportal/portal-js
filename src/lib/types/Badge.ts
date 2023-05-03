export interface Badge {
  /**
   * Indicates whether the badge should be visible or not
   */
  show: boolean
  /**
   * Example: #FF0000
   */
  color?: string
  /**
   * Text to display on the badge. If not specified, a dot will be displayed. Up to 4 characters.
   */
  text?: string
}
