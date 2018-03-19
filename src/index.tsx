/**
 * Created by jiangyukun on 2017/11/16.
 */
import 'babel-polyfill'
import 'isomorphic-fetch'

import React from 'react'
import {render} from 'react-dom'
import {createStore, applyMiddleware} from 'redux'

import 'app-core/style/index.scss'
import './commons/common.scss'
import './containers/index/disease-index.scss'
import './containers/search/search-page.scss'
import './containers/institution/institution.scss'
import './containers/message/leave-message-page.scss'

import request_3_phase from './middlewares/request_3_phase'
import search_to_storage from './middlewares/search_to_storage'

import allReducers from './reducers/index.reducer'

import Root from './containers/Root'

let searchRecordList = JSON.parse(localStorage.getItem('search-list')) || []
searchRecordList = searchRecordList.filter(d => d != '' && d != null)

const store = createStore(allReducers, {searchRecordList}, applyMiddleware(request_3_phase, search_to_storage))

render(<Root store={store}/>, document.querySelector('#root'))
if (module.hot) {
  module.hot.accept('./containers/Root', () => {
    render(<Root store={store}/>, document.querySelector('#root'))
  })
}
