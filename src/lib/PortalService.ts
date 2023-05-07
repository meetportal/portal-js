import { Base } from './PortalBase'
import { ELEMENT } from '@orango/beam-client'
import { Message } from './types/Message'
import { PortalService } from './types/PortalService'
import { RESOURCE } from './consts/resource'
import { Resource } from './types/Resource'
import { SYSTEM } from './consts/system'
import { USER } from './consts/user'
import { User } from './types/User'

export class Service extends Base implements PortalService {
  constructor(ctx: any, options?: { requestTimeout?: number }) {
    super(ctx, ctx, options)
  }

  /**
   * Performs an query against the DOM
   * @param queryPath
   * @returns
   */
  query = async (queryPath: any) => {
    const path = typeof queryPath === 'string' ? queryPath : queryPath.toString()
    const result = await this.sendRequest(ELEMENT.QUERY, path)
    return result
  }

  /**
   * Opens an application
   * @param appId  Application ID to open
   * @param message  Data to send to the application
   * @returns
   */
  openApp = (appId: string, message?: any) => {
    return this.sendRequest(SYSTEM.OPEN_APP, { appId, message })
  }

  /**
   * Sets a resource that can be used by a service or application.
   * @param resource  Resource to set
   */
  setResource = (resource: Resource) => {
    return this.sendRequest(RESOURCE.SET_RESOURCE, resource)
  }

  /**
   * Clears a resource that can be used by a service or application.
   * @param type  Type of resource to clear
   */
  clearResource = (type: string) => {
    return this.sendRequest(RESOURCE.CLEAR_RESOURCE, type)
  }

  /**
   * Sets the current user. in the host application
   */
  setUser = (user?: User) => {
    return this.sendRequest(USER.SET_USER, user)
  }

  /**
   * Sends a message to an application.
   * @param message  Message to send
   */
  sendMessage = (message: Message) => {
    return this.sendRequest(SYSTEM.SEND_MESSAGE, message)
  }

  /**
   * @private
   */
  generatePathFromProxy = (_0: any): any => {
    const pathParts: string[] = []

    const handler: ProxyHandler<any> = {
      get(_0, propKey) {
        pathParts.push(propKey.toString())
        return new Proxy(() => {}, handler)
      },
      apply(_0, _1, argArray) {
        const formattedArgs = argArray.map(arg => JSON.stringify(arg)).join(', ')
        const lastPart = pathParts[pathParts.length - 1]
        if (lastPart === 'toString') {
          return pathParts.slice(0, -1).join('.')
        }
        pathParts[pathParts.length - 1] = `${lastPart}(${formattedArgs})`
        return new Proxy(() => {}, handler)
      },
      // Add a valueOf() method to return the string path when the proxy is coerced to a primitive value
      // valueOf() {
      //   return pathParts.join('.')
      // },
    }
    return new Proxy(() => {}, handler)
  }

  /**
   * Requests permissions from the user to perform an action.
   * @param permissions  List of permissions to request
   */
  requestPermissions = (permissions: string[]) => {
    return this.sendRequest(SYSTEM.REQUEST_PERMISSIONS, permissions)
  }
}
