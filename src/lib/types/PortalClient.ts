import { PortalBase } from './PortalBase'

export interface PortalClient extends PortalBase {
  /**
   * Close the application
   */
  closeApp: () => Promise<void>
  /**
   * Event emitted when the application is maximized
   * @param callback Callback to execute when the event is emitted
   */
  onMaximize: (callback: () => void) => () => void
  /**
   * Event emitted when the application is minimized
   * @param callback Callback to execute when the event is emitted
   */
  onMinimize: (callback: () => void) => () => void
  /**
   * Event emitted when the application is restored
   * to its original size
   * @param callback Callback to execute when the event is emitted
   */
  onRestore: (callback: () => void) => () => void
}
