import { inPortal, isWorker } from './helpers'

import { Client } from './PortalClient'
import { PortalClient } from './types/PortalClient'

let portalClient: PortalClient

/**
 * Returns the portal client. Singleton.
 * @throws Error if called from a web worker
 * @throws Error if called from a non-portal environment
 */
export const usePortalClient = () => {
  // check if window.parent is the same as window, if so, we are not in a portal
  if (isWorker) {
    throw new Error('usePortalClient cannot be called from a web worker')
  }

  if (!inPortal) {
    throw new Error(
      'usePortalClient must be called from within Portal environment. Check with inPortal before calling this function.'
    )
  }

  if (!portalClient) {
    portalClient = new Client(window.parent, window)
  }
  return portalClient
}
