import { STORE as BEAM_STORE } from '@orango/beam-client'

export const STORE = {
  // Methods
  SET_ITEM: 'setStoreItem',
  GET_ITEM: 'getStoreItem',
  REMOVE_ITEM: 'removeStoreItem',
  ...BEAM_STORE,
}
