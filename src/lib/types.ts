export interface StoreOptions {
  shared?: boolean
  peristent?: boolean
}

export interface PortalBase {
  uuid: () => string
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
  pushNotification: (notification: Notification) => Promise<void>
  clearNotifications: (filters?: { groupId?: string; externalId?: string }) => Promise<void>
  setStoreItem: (key: string, value: any, options?: StoreOptions) => Promise<void>
  getStoreItem: (key: string, options?: StoreOptions) => Promise<any>
  removeStoreItem: (key: string, options?: StoreOptions) => Promise<void>
  // event handlers
  onSessionChange: (callback: (session: Session) => void) => () => void
  onUserChange: (callback: (user: User) => void) => () => void
  onResourceChange: (filter: string, callback: (resource: Resource) => void) => () => void
  onMessage: (callback: (message?: Message) => void) => () => void
}

export interface PortalService extends PortalBase {
  query: (val: any) => Promise<string>
  $: (html: string) => Document
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

export interface PortalClient extends PortalBase {
  // methods
  closeApp: () => Promise<void>
  // event handlers
  onMaximize: (callback: () => void) => () => void
  onMinimize: (callback: () => void) => () => void
  onRestore: (callback: () => void) => () => void
}

/**
 * Represents the user authenticated in the application
 */
export type User = {
  /**
   * Unique identifier for the user. May be an id, email, or other unique identifier
   */
  id: string
  /**
   * Represents a unique identifier for a company, subdomain, or
   * other entity that can be use to map an app user to a portal user
   */
  workspace: string
  /**
   * Provided if available
   * Example: jane.doe
   **/
  username?: string
  /**
   * Provided if available
   * Example: jane.doe@mail.com
   */
  email?: string
  /**
   * Represents the hostname of the site the user is on
   * Example: mysite.com
   * Example: mysite.com:8080
   * Example: subdomain.mysite.com
   */
  hostname: string
}

/**
 * Represents the Portal session and user
 */
export type Session = {
  /**
   * Unique identifier for the session
   */
  id: string
  /**
   * Represents the Portal workspace id
   */
  workspaceId: string
  /**
   * Represents the Portal workspace name
   * Example: My Workspace
   */
  workspaceName: string
  /**
   * Represents the hostname of the site the user is on. This includes the subdomain and port if applicable.
   * Example: mysite.com
   * Example: mysite.com:8080
   * Example: subdomain.mysite.com
   * Example: subdomain.mysite.com:8080
   * Example: localhost:8080
   * Example: localhost
   */
  hostname: string
  /**
   * The portal user id
   */
  userId: string
  /**
   * The portal first name
   */
  firstName: string
  /**
   * The portal last name
   */
  lastName: string
  /**
   * The Portal user's email address if available and if the user has provided it.
   */
  email?: string
  /**
   * This is the Portal user's mobile number if available and if the user has provided it.
   */
  mobile?: string
}

export type Resource = {
  id: string
  type: string
  data?: any
}

export type Message = {
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

export type Notification = {
  externalId?: string
  groupId?: string
  title: string
  text: string
  data?: any
}

export type Badge = {
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

export type Workspace = {
  id: string
  name: string
}
