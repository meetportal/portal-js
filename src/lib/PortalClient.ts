import { APP } from './consts/app'
import { Base } from './PortalBase'
import { PortalClient } from './types/PortalClient'

export class Client extends Base implements PortalClient {
  /**
   * Close the application.
   *
   */
  closeApp = () => {
    return this.sendRequest(APP.CLOSE)
  }

  /**
   * Notifies when the application is maximized.
   * @param callback
   * @returns
   */
  onMaximize = (callback: () => void) => {
    return this.subscribe(APP.ON_MAXIMIZE, '*', callback)
  }

  /**
   * Notifies when the application is minimized.
   * @param callback
   * @returns
   */
  onMinimize = (callback: () => void) => {
    return this.subscribe(APP.MINIMIZE, '*', callback)
  }

  /**
   * Notifies when the application is restored from a maximized or minimized state.
   * @param callback
   * @returns
   */
  onRestore = (callback: () => void) => {
    return this.subscribe(APP.RESTORE, '*', callback)
  }
}
