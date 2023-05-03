import { Message } from './Message'
import { PortalBase } from './PortalBase'
import { Resource } from './Resource'
import { User } from './User'

export interface PortalService extends PortalBase {
  query: (val: any) => Promise<string>
  setResource: (resource: Resource) => Promise<void>
  clearResource(type: string): Promise<void>
  setUser: (appUser?: User) => Promise<void>
  /**
   * Experimental and subject to change.
   * @param appId
   * @param data
   * @returns
   */
  sendMessage: (message: Message) => Promise<void>
}
