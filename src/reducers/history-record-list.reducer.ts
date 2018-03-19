/**
 * Created by jiangyukun on 2017/8/2.
 */
import {fromJS} from 'immutable'
import {APP} from '../core/constants/types'

const initValue = []

export default function searchRecordList(iState = fromJS(initValue), action) {
  let nextIState = iState

  switch (action.type) {
    case APP.ADD_SEARCH_RECORD:
      let searchKey = action.searchKey
      nextIState = nextIState.concat([searchKey])
      break
  }

  return nextIState
}
