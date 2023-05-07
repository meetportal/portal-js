import { STORE as BEAM_STORE } from '@orango/beam-client'

export const STORE = {
  /**
   * Sets an item in the Portal store
   */
  SET_ITEM: 'setStoreItem',
  /**
   * Gets an item from the Portal store
   */
  GET_ITEM: 'getStoreItem',
  /**
   * Removes an item from the Portal store
   */
  REMOVE_ITEM: 'removeStoreItem',
  ...BEAM_STORE,
}
