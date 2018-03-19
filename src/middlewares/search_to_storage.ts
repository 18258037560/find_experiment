/**
 * http请求3个阶段的封装
 * Created by jiangyukun on 2017/1/25.
 */
import {APP} from '../core/constants/types'

export const THREE_PHASE = Symbol('THREE_PHASE')

export default ({dispatch, getState}) => next => action => {
  if (action.type == APP.ADD_SEARCH_RECORD) {
    try {
      return next(action)
    } finally {
      let list = getState().searchRecordList
      localStorage.setItem('search-list', JSON.stringify(list))
    }
  }
  return next(action)
}
