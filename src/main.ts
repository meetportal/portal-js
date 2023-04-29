import * as beam from '@orango/beam-client'

import {
  CONSTS,
  APP as PORTAL_APP,
  ELEMENT as PORTAL_ELEMENT,
  NOTIFICATION as PORTAL_NOTIFICATION,
  RESOURCE as PORTAL_RESOURCE,
  SESSION as PORTAL_SESSION,
  STORE as PORTAL_STORE,
  SYSTEM as PORTAL_SYSTEM,
} from './lib/consts'

export { inPortal } from './lib/helpers'
export { usePortalClient } from './lib/usePortalClient'
export { usePortalService } from './lib/usePortalService'
export type {
  Badge,
  Message,
  Notification,
  PortalClient,
  PortalService,
  Resource,
  Session,
  Workspace,
  User,
  StoreOptions,
} from './lib/types'

export const VERSION = __APP_VERSION__
export const APP = PORTAL_APP
export const CONNECTION = beam.CONNECTION
export const WINDOW = beam.WINDOW
export const NETWORK = beam.NETWORK
export const STORE = { ...PORTAL_STORE, ...beam.STORE }
export const ELEMENT = { ...PORTAL_ELEMENT, ...beam.ELEMENT }
export const ELEMENTS = beam.ELEMENTS
export const FORM = beam.FORM
export const INPUT = beam.INPUT
export const NOTIFICATION = PORTAL_NOTIFICATION
export const RESOURCE = PORTAL_RESOURCE
export const SESSION = PORTAL_SESSION
export const SYSTEM = PORTAL_SYSTEM

// FOR INTERNAL USE ONLY //
/** @private */
export const PORTAL_CONSTS = CONSTS
/** @private */
export const BEAM_CONSTS = beam.CONSTS
/** @private */
export const NAMESPACES = beam.NAMESPACES
/** @private */
export const stringify = beam.stringify
