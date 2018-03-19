/**
 * Created by jiangyukun on 2017/11/16.
 */
import React from 'react'
import {connect} from 'react-redux'

import DiseaseCategory from './DiseaseCategory'
import SelectProvinceCity from './SelectProvinceCity'

import Data from '../../interfaces/Data'
import RouteComponent from '../../interfaces/RouteComponent'
import {fetchDiseaseCategory, clearSearchKey} from '../../commons/app.action'

interface DiseaseIndexProps extends RouteComponent {
  clearSearchKey: () => void
  fetchDiseaseCategory: () => void
  diseaseCategory: Data<any>
  diseaseSearchKey: string
}

class DiseaseIndex extends React.Component<DiseaseIndexProps> {
  state = {
    categoryId: '',
    diseaseId: '',
    showSelectCity: false
  }

  handleSearch = () => {
    this.props.history.push('/search')
  }

  handleDiseaseChange = (categoryId, diseaseId) => {
    this.setState({categoryId, diseaseId})
  }

  handleCategoryOpen = (categoryId) => {
    if (this.state.categoryId == categoryId) {
      this.setState({categoryId: ''})
    } else {
      this.setState({categoryId})
    }
    this.setState({diseaseId: ''})
  }

  componentDidMount() {
    this.props.fetchDiseaseCategory()
  }

  render() {
    let diseaseCategory = this.props.diseaseCategory.data || []
    return (
      <div className="index-page">
        {
          this.state.showSelectCity && (
            <SelectProvinceCity
              categoryId={this.state.categoryId}
              diseaseId={this.state.diseaseId}
              onExited={() => this.setState({showSelectCity: false})}
            />
          )
        }
        <div className="search-box">
          <div className="search-icon">
            <img src={require('../../imgs/magnifier.png')}/>
          </div>
          <div className="search-input">
            <input type="search" placeholder="输入关键字"
                   onFocus={this.handleSearch}
                   value={this.props.diseaseSearchKey} onChange={() => null}
            />
          </div>
          {
            this.props.diseaseSearchKey != '' && (
              <div className="remove-icon" onClick={this.props.clearSearchKey}>
                <img src={require('../../imgs/cha.png')}/>
              </div>
            )
          }
        </div>
        <div className="bannerBox">
          <img className="banner" src={require('../../imgs/banner.png')}/>
        </div>
        <div className="disease-category-container">
          {
            diseaseCategory.map(category => {
              return (
                <DiseaseCategory
                  key={category['id']}
                  category={category}
                  currentCategoryId={this.state.categoryId}
                  currentDiseaseId={this.state.diseaseId}
                  toggleOpen={this.handleCategoryOpen}
                  onSelectDiseaseChange={(diseaseId) => this.handleDiseaseChange(category['id'], diseaseId)}
                  searchKey={this.props.diseaseSearchKey}
                />
              )
            })
          }
        </div>
        {
          (this.state.categoryId || this.state.diseaseId) && (
            <button className="next-step" onClick={() => this.setState({showSelectCity: true})}>下一步</button>
          )
        }
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    diseaseCategory: state.diseaseCategory,
    diseaseSearchKey: state.app.diseaseSearchKey
  }
}

export default connect(mapStateToProps, {fetchDiseaseCategory, clearSearchKey})(DiseaseIndex)
