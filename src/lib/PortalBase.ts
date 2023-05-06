import { CONNECTION, uuid } from '@orango/beam-client'
import { inPortal, isWorker } from './helpers'

import { APP } from './consts/app'
import { Badge } from './types/Badge'
import { Message } from './types/Message'
import { NOTIFICATION } from './consts/notification'
import { NotificationMessage } from './types/NotificationMessage'
import { PortalBase } from './types/PortalBase'
import { RESOURCE } from './consts/resource'
import { SESSION } from './consts/session'
import { STORE } from './consts/store'
import { SYSTEM } from './consts/system'
import { Session } from './types/Session'
import { USER } from './consts/user'
import { User } from './types/User'

const VERSION = __APP_VERSION__

export class Base implements PortalBase {
  id: string
  #batchTimer: any = null
  #batchMessages: any = []
  #requests: Map<string, any> = new Map()
  #eventHandlers: Map<string, any> = new Map()
  #requestTimeout = 0
  #postMessageOrigin = '*'
  #ctx: any
  #issuer = 'portal'

  /**
   *
   * @param options Allows to set the request timeout in milliseconds. Default is 0 (no timeout).
   */
  constructor(ctxSender: any, ctxReceiver: any, options?: { requestTimeout?: number }) {
    if (options) {
      this.#requestTimeout = options.requestTimeout || 0
    }

    this.id = uuid()

    this.#ctx = ctxSender

    ctxReceiver.addEventListener('message', (e: MessageEvent) => {
      const { id, data, error } = e.data
      const request = this.#requests.get(id)
      if (request) {
        request.timer && clearTimeout(request.timer)
        // requestThrottle.delete(request.path)
        this.#requests.delete(id)
        if (error) {
          request.reject(error)
        } else {
          request.resolve(data)
        }
      } else {
        const callback = this.#eventHandlers.get(id)
        if (callback) {
          callback(data)
        }
      }
    })
  }

  openApp = (appId: string, message: Message) => {
    return this.sendRequest(SYSTEM.OPEN_APP, { appId, message })
  }

  /**
   * All requests to the portal are sent as a batch. This method is used to create a
   * promise that will be resolved when the portal responds to the request.
   *
   * @param id
   * @param path
   * @param timeout
   * @returns
   * @hidden
   */
  // const requestThrottle = new Map<string, Promise<any>>()
  #createPromise = (id: string, path: string, timeout: number = this.#requestTimeout) => {
    // if (requestThrottle.has(path)) {
    //   console.log('🆘 PROMISE ALREADY EXIST REUSE 🆘 -- ', path)
    //   return requestThrottle.get(path)
    // }
    const promise = new Promise<any>((resolve, reject) => {
      let timer: any = null
      if (timeout) {
        timer = setTimeout(() => {
          reject(new Error('timeout'))
        }, timeout)
      }
      this.#requests.set(id, { path, timer, resolve, reject })
    })
    // requestThrottle.set(path, promise)
    return promise
  }

  /**
   * Used to send a batch of requests to the portal. In order to reduce the number of
   * messages sent to the portal, requests are batched together and sent in a single
   * message.
   * @param params
   * @returns
   * @hidden
   */
  #batch = async (params: { id: string; issuer: string; path: string; version: string; args: any[] }) => {
    this.#batchMessages.push(params)
    clearTimeout(this.#batchTimer)

    // if batch is full, send it max is 10
    if (this.#batchMessages.length >= 10) {
      this.postMessage({ batch: this.#batchMessages })
      this.#batchMessages.length = 0
      return
    }

    this.#batchTimer = setTimeout(() => {
      this.postMessage({ batch: this.#batchMessages })
      this.#batchMessages.length = 0
    }, 1)
  }

  postMessage = (message: any) => {
    if (isWorker) {
      this.#ctx.postMessage(message)
    } else if (inPortal) {
      this.#ctx.postMessage(message, this.#postMessageOrigin)
    }
  }

  setContext = (ctx: any) => {
    this.#ctx = ctx
  }

  /**
   * Sends a request to the portal. This is used to send requests to the portal that are not
   * defined in the portal-js library.
   */
  sendRequest = async (path: string, ...args: any[]) => {
    const id = uuid()
    this.#batch({ id, issuer: this.#issuer, path, version: VERSION, args })
    return this.#createPromise(id, path)
  }

  /**
   * Subscribes to an event. Returns a function that can be called to unsubscribe.
   * This is used to subscribe to events from the portal that are not defined in the portal-js library.
   *
   * @param event
   * @param filter
   * @param callback
   * @returns
   */
  subscribe = (event: string, filter = '*', callback: any) => {
    const id = uuid()
    this.#eventHandlers.set(id, callback)
    this.#batch({ id, issuer: this.#issuer, version: VERSION, path: 'on.' + event, args: [filter] })
    return () => {
      this.#eventHandlers.delete(id)
      setTimeout(() => {
        this.postMessage({ id, path: 'off.' + event, args: [filter] })
      }, 0)
    }
  }

  /**
   * Disconnect from the portal. This will stop all subscriptions and prevent any further requests.
   */
  disconnect = () => {
    if (this.#ctx) {
      // loop through all promises and reject them
      this.postMessage({ id: this.id, path: CONNECTION.DISCONNECT })
    }
  }

  /**
   * Used for testing purposes only. Can be used to make sure that the portal is connected.
   * @param message send a messag that will be sent back from portal
   * @returns
   */
  echo = (message: string) => {
    return this.sendRequest(SYSTEM.ECHO, message)
  }

  /**
   * Request permissions from the user to perform certain actions that require permissions.
   * @param permissions
   * @returns
   */
  requestPermissions = (permissions: string[]) => {
    return this.sendRequest(SYSTEM.REQUEST_PERMISSIONS, permissions)
  }

  /**
   * Returns the current portal session.
   */
  getSession = async (): Promise<Session> => {
    return this.sendRequest(SESSION.GET_SESSION) as Promise<Session>
  }

  /**
   * Sets a badge on the application's icon. It can display a text up to 4 characters or a dot. Color is standard html color or a hex value.
   *
   * @param options
   */
  setBadge = (options?: Badge) => {
    return this.sendRequest(APP.SET_BADGE, options) as Promise<void>
  }

  /**
   * Sends a notification to the portal. Portal will display the notification to the user.
   */
  pushNotification = (message: NotificationMessage) => {
    return this.sendRequest(NOTIFICATION.PUSH, message)
  }

  /**
   * Clears all notifications from the portal that belong to a specific group.
   *
   * @param groupId Used to identify the group of notifications to be cleared.
   * @returns
   */
  clearNotifications = (filters?: { groupId?: string; externalId?: string }) => {
    return this.sendRequest(NOTIFICATION.CLEAR, filters)
  }

  /**
   * Sets a value in the session store. By default the value will only be available to the current application.
   * If you want to share the value with other applications in the portal, set the isShared parameter to true.
   * This value is ephemeral and will be cleared when the portal is closed.
   *
   * @param key The key to store the value under.
   * @param value The value to store.
   * @param isShared If true, the value will be available to all applications in the portal.
   * @returns
   */
  setStoreItem = <T>(
    key: string,
    value: T,
    options?: {
      persist?: boolean
      shared?: boolean
    }
  ) => {
    return this.sendRequest(STORE.SET_ITEM, key, value, options)
  }

  /**
   * Gets a value from the session store. By default the value will only be available to the current application.
   * If the value is shared with other applications in the portal, set the isShared parameter to true.
   *
   * @param key The key to store the value under.
   * @param defaults The value to return if the key is not found.
   * @param isShared Set to true if the value is shared between applications.
   * @returns
   */
  getStoreItem = async <T>(
    key: string,
    defaults?: any,
    options?: {
      persist?: boolean
      shared?: boolean
    }
  ): Promise<T> => {
    return this.sendRequest(STORE.GET_ITEM, key, options).then((value: any) => {
      if (value ?? defaults) {
        return defaults
      }
      return value
    })
  }

  /**
   * The key to remove from the session store. If the value is shared with other applications in
   * the portal, set the isShared parameter to true.
   *
   * @param key The key to remove from the session store.
   * @param isShared Set to true if the value is shared between applications.
   * @returns
   */
  removeStoreItem = (
    key: string,
    options?: {
      persist?: boolean
      shared?: boolean
    }
  ) => {
    return this.sendRequest(STORE.REMOVE_ITEM, key, options)
  }

  /**
   * Notifies when the user session changes. This includes when the user logs in
   * or out, or when the workspace changes,
   * @param callback
   * @returns
   */
  onSessionChange = (callback: (session: Session) => void) => {
    return this.subscribe(SESSION.ON_CHANGE, '*', callback)
  }

  /**
   * Notifies when a resources has been added, updated, or removed.
   * @param filter Used to filter the resources that are returned. Use a wildcard (*) to return all resources. Use a resource type to return all resources of that type. For multiple resource types, separate the types with a pipe. For example, "user|group".
   * @param callback
   * @returns
   */
  onResourceChange = (filter = '*', callback: (resource: any) => void) => {
    return this.subscribe(RESOURCE.ON_CHANGE, filter, callback)
  }

  /**
   * Notifies when a notification has responded to a notification
   * @param filter Used to filter the notifications that are returned. Use a wildcard (*) to return all notifications. Use a notification type to return all notifications of that type. For multiple notification types, separate the types with a pipe. For example, "user|group".
   * @param callback
   * @returns
   */
  onMessage = (callback: (message?: Message) => void) => {
    return this.subscribe(NOTIFICATION.ON_CLICK, '*', callback)
  }

  /**
   * Notifies when the user in the application changes. This is not the same as the Portal user.
   * This is the user that is logged into the application.
   *
   * @param callback
   * @returns
   */
  onUserChange = (callback: (user: User) => void) => () => {
    return this.subscribe(USER.ON_CHANGE, '*', callback)
  }
}
