import { PortalBase } from './PortalBase'

export interface PortalClient extends PortalBase {
  // methods
  closeApp: () => Promise<void>
  // event handlers
  onMaximize: (callback: () => void) => () => void
  onMinimize: (callback: () => void) => () => void
  onRestore: (callback: () => void) => () => void
}
