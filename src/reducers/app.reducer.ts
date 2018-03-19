/**
 * Created by jiangyukun on 2017/8/2.
 */
import {fromJS} from 'immutable'
import {APP} from '../core/constants/types'
import {flagState} from './redux-helper'

const initValue = {
  diseaseSearchKey: '',
  leaveMessageSuccess: false
}

export default function app(iState = fromJS(initValue), action) {
  let nextIState = iState

  switch (action.type) {
    case APP.ADD_SEARCH_RECORD:
      let searchKey = action.searchKey
      nextIState = nextIState.set('diseaseSearchKey', searchKey)
      break
    case APP.SEARCH_FROM_HISTORY:
      let historyName = action.historyName
      nextIState = nextIState.set('diseaseSearchKey', historyName)
      break
    case APP.CLEAR_SEARCH_KEY:
      nextIState = nextIState.set('diseaseSearchKey', '')
      break
  }

  nextIState = flagState(nextIState, action)
    .handle(APP.LEAVE_MESSAGE, 'leaveMessageSuccess')
    .get()


  return nextIState
}
