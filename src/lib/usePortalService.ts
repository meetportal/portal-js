import { PortalService } from './types/PortalService'
import { Service } from './PortalService'
import { isWorker } from './helpers'

let portalService: PortalService

export const usePortalService = () => {
  if (!isWorker) {
    throw new Error('usePortalService must be called from a web worker')
  }

  if (!portalService) {
    portalService = new Service(self as any)
  }
  return portalService
}
