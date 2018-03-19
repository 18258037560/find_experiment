/**
 * Created by jiangyukun on 2017/11/16.
 */
import {combineReducers} from 'redux'
import {wrapReducerState} from 'app-core/tools/redux-utils'

import {APP} from '../core/constants/types'

import pageList from './page-list.reducer'
import data from '../commons/data.reducer'

import searchRecordList from './history-record-list.reducer'
import app from './app.reducer'

let allReducers = combineReducers({
  app: wrapReducerState(app),
  searchRecordList: wrapReducerState(searchRecordList),
  diseaseCategory: wrapReducerState(data(APP.FETCH_DISEASE_CATEGORY)),
  provinceCity: wrapReducerState(data(APP.FETCH_PROVINCE_CITY)),
  trailList: wrapReducerState(pageList(APP.FETCH_TRAIL_LIST)),
})

export default allReducers
