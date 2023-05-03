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
  /**
   * Indicates if the user has linked their portal account with the application.
   */
  isConnected: boolean
}
