/**
 * @private
 **/
export const CONSTS = () => {
  return {
    SYSTEM: {
      // Methods
      ECHO: 'echo',
      REQUEST_PERMISSIONS: 'requestPermissions',
      SEND_MESSAGE: 'sendMessage',
      OPEN_APP: 'openApp',
      // Events
      ON_MESSAGE: 'message',
    },
    SESSION: {
      GET_SESSION: 'getSession',
      // Events
      ON_CHANGE: 'sessionChange',
    },
    APP: {
      // Methods
      MAXIMIZE: 'maximize',
      MINIMIZE: 'minimize',
      RESTORE: 'restore',
      SET_BADGE: 'setBadge',
      CLOSE: 'closeApp',
      // Events
      ON_MAXIMIZE: 'maximize',
      ON_MINIMIZE: 'minimize',
      ON_RESTORE: 'restore',
    },
    ELEMENT: {
      // Methods - used by service since worker doesn't have access to DOM
      QUERY: 'QUERY', // TODO: move to beam-client?
    },
    USER: {
      // Methods
      // GET_USER: 'getUser',
      SET_USER: 'setUser',
      // Events
      ON_CHANGE: 'userChange',
    },
    RESOURCE: {
      // Methods
      // GET_RESOURCE: 'getResource',
      SET_RESOURCE: 'setResource',
      CLEAR_RESOURCE: 'clearResource',
      // Events
      ON_CHANGE: 'resourceChange',
    },
    NOTIFICATION: {
      // Methods
      PUSH: 'pushNotification',
      CLEAR: 'clearNotifications',
      // Events
      ON_CLICK: 'notificationClick',
    },
    STORE: {
      // Methods
      SET_ITEM: 'setStoreItem',
      GET_ITEM: 'getStoreItem',
      REMOVE_ITEM: 'removeStoreItem',
    },
  }
}

export const SYSTEM = CONSTS().SYSTEM
export const SESSION = CONSTS().SESSION
export const APP = CONSTS().APP
export const ELEMENT = CONSTS().ELEMENT
export const RESOURCE = CONSTS().RESOURCE
export const NOTIFICATION = CONSTS().NOTIFICATION
export const STORE = CONSTS().STORE
export const USER = CONSTS().USER
