// inPortal or is service worker
const s = self as any

/**
 * Whether the current context is a service worker.
 */
export const isWorker = !!s.WorkerGlobalScope
/**
 * Whether the current context is a Portal application.
 */
export const inPortal = isWorker || `${self.name ?? ''}`.startsWith('portal')
