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
