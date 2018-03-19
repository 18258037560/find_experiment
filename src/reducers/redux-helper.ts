/**
 * Created by jiangyukun on 2017/11/17.
 */
import phase from '../core/constants/phase'

export function flagState(iState, action) {
  let nextIState = iState
  let chain = {
    get: () => nextIState,
    handle: (type, key) => {
      if (action.type == type + phase.START) {
        nextIState = iState.set(key, false)
      }
      if (action.type == type + phase.SUCCESS) {
        nextIState = iState.set(key, true)
      }
      return chain
    }
  }

  return chain
}
