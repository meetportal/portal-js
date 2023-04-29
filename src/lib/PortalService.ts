import { ELEMENT, RESOURCE, SYSTEM, USER } from './consts'
import { Message, PortalService, Resource, User } from './types'

import { Client } from './PortalClient'

export class Service extends Client implements PortalService {
  constructor(ctx: any, options?: { requestTimeout?: number }) {
    super(ctx, ctx, options)
  }

  query = async (queryPath: any) => {
    const path = typeof queryPath === 'string' ? queryPath : queryPath.toString()
    const result = await this.sendRequest(ELEMENT.QUERY, path)
    return result
  }

  $ = (html: string) => {
    const hostProxy = new Proxy(() => {}, {})
    const via = this.generatePathFromProxy(hostProxy)
    return via.$(html) as Document
  }

  openApp = (appId: string, message?: any) => {
    return this.sendRequest(SYSTEM.OPEN_APP, { appId, message })
  }

  setResource = (resource: Resource) => {
    return this.sendRequest(RESOURCE.SET_RESOURCE, resource)
  }

  clearResource = (type: string) => {
    return this.sendRequest(RESOURCE.CLEAR_RESOURCE, type)
  }

  setUser = (user?: User) => {
    return this.sendRequest(USER.SET_USER, user)
  }

  sendMessage = (message: Message) => {
    return this.sendRequest(SYSTEM.SEND_MESSAGE, message)
  }

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

  requestPermissions = (permissions: string[]) => {
    return this.sendRequest(SYSTEM.REQUEST_PERMISSIONS, permissions)
  }
}
