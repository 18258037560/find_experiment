/**
 * Created by jiangyukun on 2017/11/16.
 */
import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'

import {APP} from '../../core/constants/types'

interface SearchProps {
  dispatch: any
  searchRecordList: string[]
}

class Search extends React.Component<SearchProps> {
  static contextTypes = {
    router: PropTypes.any
  }

  state = {
    searchKey: ''
  }

  handleSubmit = (e) => {
    this.props.dispatch({type: APP.ADD_SEARCH_RECORD, searchKey: this.state.searchKey})
    this.context.router.history.goBack()
    e.preventDefault()
  }

  toSearch = () => {
    if (this.state.searchKey != '') {
      this.props.dispatch({type: APP.ADD_SEARCH_RECORD, searchKey: this.state.searchKey})
    }
    this.context.router.history.goBack()
  }

  search = (historyName) => {
    this.props.dispatch({type: APP.SEARCH_FROM_HISTORY, historyName})
    this.context.router.history.goBack()
  }

  render() {
    return (
      <div className="search-page">
        <form className="input-box" action="" onSubmit={this.handleSubmit}>
          <div className="search-icon" onClick={this.toSearch}>
            <img src={require('../../imgs/magnifier.png')}/>
          </div>
          <div className="search-input">
            <input type="search" placeholder="输入关键字"
                   value={this.state.searchKey} onChange={e => this.setState({searchKey: e.target.value})}
            />
          </div>
          {
            this.state.searchKey != '' && (
              <div className="remove-icon" onClick={() => this.setState({searchKey: ''})}>
                <img src={require('../../imgs/cha.png')}/>
              </div>
            )
          }
        </form>
        <section className="search-history">
          <header>搜索历史</header>
          <ul className="search-history-list">
            {
              this.props.searchRecordList.reverse().map((item, index) => {
                return (
                  <li key={index} className="history-item" onClick={() => this.search(item)}>{item}</li>
                )
              })
            }
          </ul>
        </section>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    searchRecordList: state.searchRecordList
  }
}

export default connect(mapStateToProps)(Search)
