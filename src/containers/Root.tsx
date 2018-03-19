/**
 * Created by jiangyukun on 2017/11/20.
 */
import React from 'react'
import {Provider} from 'react-redux'
import {HashRouter, Route, Redirect} from 'react-router-dom'

import DiseaseIndex from './index/DiseaseIndex'
import Search from './search/Search'
import Institution from './institution/Institution'
import LeaveMessage from './message/LeaveMessage'

interface RootProps {
  store: any
}

class Root extends React.Component<RootProps> {
  render() {
    return (
      <Provider store={this.props.store}>
        <HashRouter>
          <div>
            <Route exact path="/" component={DiseaseIndex}/>
            <Route exact path="/index" component={DiseaseIndex}/>
            <Route exact path="/search" component={Search}/>
            <Route exact path="/institution/:categoryId/:diseaseId/:provinceId/:cityId" component={Institution}/>
            <Route exact path="/leave-message" component={LeaveMessage}/>
          </div>
        </HashRouter>
      </Provider>
    )
  }
}

export default Root
