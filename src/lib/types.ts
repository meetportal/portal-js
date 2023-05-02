export interface StoreOptions {
  shared?: boolean
  peristent?: boolean
}

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
export interface User {
  /**
   * Unique identifier for the user. May be an id, email, or other unique identifier
   */
  id: string
  /**
   * Represents a unique identifier for a team, organization, company, tenant, etc.
   * This might be found as subdomain, org company, or other unique identifier.
   * This identifier does not change for a user. But a user may belong to multiple groups.
   *
   * If it is a generic web app, it may not have a group. Example: social media website.
   *
   * The group is used to identify and connect the user.
   */
  group?: string
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
}

/**
 * Represents the Portal session and user
 */
export interface Session {
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
   * Represents a unique identifier for a team, organization, company, tenant, etc.
   * This might be found as subdomain, org company, or other unique identifier.
   * This identifier does not change for a user. But a user may belong to multiple groups.
   */
  group?: string
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

export interface Resource {
  id: string
  type: string
  data?: any
}

export interface Message {
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

export interface NotificationMessage extends Message {
  type: 'app' | 'system'
  title: string
  text: string
  /**
   * Automatically populated by the Portal. Do not set. It will be overwritten.
   */
  iconUrl?: string
  createdAt: Date
}
// {
//   externalId?: string
//   groupId?: string
//   title: string
//   text: string
//   data?: any
// }

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

export interface Workspace {
  id: string
  name: string
}
