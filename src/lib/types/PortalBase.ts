import { Badge } from './Badge'
import { Message } from './Message'
import { NotificationMessage } from './NotificationMessage'
import { Session } from './Session'
import { StoreOptions } from './StoreOptions'
import { User } from './User'

export interface PortalBase {
  echo: (message: string) => Promise<string>
  /**
   * Experimental and subject to change.
   * @param appId
   * @param message
   * @returns
   */
  openApp: (appId: string, message?: any) => Promise<void>
  disconnect: () => void
  sendRequest: (path: string, ...args: any[]) => Promise<any>
  requestPermissions: (permissions: string[]) => Promise<void>
  subscribe: (event: string, filter: string, callback: any) => () => void
  setBadge: (options?: Badge) => Promise<void>
  getSession: () => Promise<Session>
  // getResource: (type?: string) => Promise<Resource>
  pushNotification: (notification: NotificationMessage) => Promise<void>
  clearNotifications: (filters?: { groupId?: string; externalId?: string }) => Promise<void>
  setStoreItem: (key: string, value: any, options?: StoreOptions) => Promise<void>
  getStoreItem: (key: string, options?: StoreOptions) => Promise<any>
  removeStoreItem: (key: string, options?: StoreOptions) => Promise<void>
  // event handlers
  onSessionChange: (callback: (session: Session) => void) => () => void
  onUserChange: (callback: (user: User) => void) => () => void
  onResourceChange: (filter: string, callback: (resource: any) => void) => () => void
  onMessage: (callback: (message?: Message) => void) => () => void
}
