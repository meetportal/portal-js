export { inPortal } from './lib/helpers'
export { usePortalClient } from './lib/usePortalClient'
export { usePortalService } from './lib/usePortalService'
export type {
  Badge,
  Message,
  NotificationMessage,
  PortalBase,
  PortalClient,
  PortalService,
  Resource,
  Session,
  Workspace,
  User,
  StoreOptions,
} from './lib/types'

export const VERSION = __APP_VERSION__
export { $, connectToTarget, uuid } from '@orango/beam-client'
export { CONNECTION } from '@orango/beam-client'
export { WINDOW } from '@orango/beam-client'
export { NETWORK } from '@orango/beam-client'
export { ELEMENT } from '@orango/beam-client'
export { ELEMENTS } from '@orango/beam-client'
export { FORM } from '@orango/beam-client'
export { INPUT } from '@orango/beam-client'
export { APP } from './lib/consts/app'
export { NOTIFICATION } from './lib/consts/notification'
export { RESOURCE } from './lib/consts/resource'
export { SESSION } from './lib/consts/session'
export { SYSTEM } from './lib/consts/system'
