// inPortal or is service worker
const s = self as any
export const isWorker = !!s.WorkerGlobalScope
export const inPortal = isWorker || `${self.name ?? ''}`.startsWith('portal')
