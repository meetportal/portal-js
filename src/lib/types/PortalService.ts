import { Message } from './Message'
import { PortalBase } from './PortalBase'
import { Resource } from './Resource'
import { User } from './User'

export interface PortalService extends PortalBase {
  /**
   * Performs an query against the DOM
   * @param val
   */
  query: (val: any) => Promise<string>
  /**
   * Sets a resource that can be used by a service or application.
   * @param resource Resource to set
   */
  setResource: (resource: Resource) => Promise<void>
  /**
   * Clears a resource that can be used by a service or application.
   * @param type Type of resource to clear
   */
  clearResource(type: string): Promise<void>
  /**
   * Sets the current user.
   * @param appUser
   */
  setUser: (appUser?: User) => Promise<void>
  /**
   * Experimental and subject to change.
   * @param appId Application ID to open
   * @param data Data to send to the application
   */
  sendMessage: (message: Message) => Promise<void>
}
