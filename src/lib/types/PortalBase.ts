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
  /**
   * Disconnects the application or service from the Portal.
   */
  disconnect: () => void
  /**
   * Sends a request action to the Portal.
   * @param path Path or action to send to the Portal
   * @param args Arguments to pass to the action
   */
  sendRequest: (path: string, ...args: any[]) => Promise<any>
  /**
   * Requests permissions from the user to perform an action.
   * @param permissions List of permissions to request
   */
  requestPermissions: (permissions: string[]) => Promise<void>
  /**
   * Subscribes to an event from the Portal.
   * @param event Event to subscribe to
   * @param filter Filter to apply to the event
   * @param callback Callback to execute when the event is emitted
   */
  subscribe: (event: string, filter: string, callback: any) => () => void
  /**
   * Sets a badge on the application icon.
   * @param options Options for the badge
   */
  setBadge: (options?: Badge) => Promise<void>
  /**
   * Gets the current session.
   */
  getSession: () => Promise<Session>
  /**
   * Pushes a notification to the user.
   * @param notification Notification to push
   */
  pushNotification: (notification: NotificationMessage) => Promise<void>
  /**
   * Clears one or more notifications.
   * @param filters Filters to apply to the notifications
   */
  clearNotifications: (filters?: { groupId?: string; externalId?: string }) => Promise<void>
  /**
   * Sets a value in the Portal store.
   * @param key Key to set
   * @param value Value to set
   * @param options Options for the store
   */
  setStoreItem: (key: string, value: any, options?: StoreOptions) => Promise<void>
  /**
   * Gets a value from the Portal store.
   * @param key Key to get
   * @param options Options for the store
   */
  getStoreItem: (key: string, options?: StoreOptions) => Promise<any>
  /**
   * Removes a value from the Portal store.
   * @param key Key to remove
   * @param options Options for the store
   */
  removeStoreItem: (key: string, options?: StoreOptions) => Promise<void>
  /**
   * Event emitted when the session is changed.
   * @param callback Callback to execute when the event is emitted
   */
  onSessionChange: (callback: (session: Session) => void) => () => void
  /**
   * Event emitted when the user is changed.
   * @param callback Callback to execute when the event is emitted
   */
  onUserChange: (callback: (user: User) => void) => () => void
  /**
   * Event emitted when the resource is changed.
   * @param filter Filter to apply to the resource
   * @param callback Callback to execute when the event is emitted
   */
  onResourceChange: (filter: string, callback: (resource: any) => void) => () => void
  /**
   * Event emitted when a message is received from an application.
   * @param callback Callback to execute when the event is emitted
   */
  onMessage: (callback: (message?: Message) => void) => () => void
}
