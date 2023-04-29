import { Client } from './PortalClient'
import { PortalClient } from './types'

let portalClient: PortalClient

export const usePortalClient = () => {
  if (!portalClient) {
    portalClient = new Client(window.parent, window)
  }
  return portalClient
}
