import { PortalService } from './types/PortalService'
import { Service } from './PortalService'
import { isWorker } from './helpers'

let portalService: PortalService

/**
 * Returns the PortalService instance for the current context. This should only be called from a web worker. Singleton.
 * @throws If called from a non-web worker context
 * @returns
 */
export const usePortalService = () => {
  if (!isWorker) {
    throw new Error('usePortalService must be called from a web worker')
  }

  if (!portalService) {
    portalService = new Service(self as any)
  }
  return portalService
}
