/**
 * Created by jiangyukun on 2017/11/16.
 */
import React from 'react'
import {connect} from 'react-redux'
import Spinner from 'app-core/common/Spinner'
import CheckBox from 'app-core/checkbox/CheckBox'

import Data from '../../interfaces/Data'
import RouteComponent from '../../interfaces/RouteComponent'
import {fetchTrailList, fetchDiseaseCategory, fetchProvinceCity} from '../../commons/app.action'
import List from '../../interfaces/List'

interface InstitutionProps extends RouteComponent {
  fetchTrailList: (page, pageSize, options) => void
  trailList: List<any>
  fetchDiseaseCategory: () => void
  diseaseCategory: Data<any>
  fetchProvinceCity: () => void
  provinceCity: Data<any>
}

class Institution extends React.Component<InstitutionProps> {
  categoryId: string
  diseaseId: string
  provinceId: string
  cityId: string
  page = 0
  isFetching = false

  state = {
    medicineName: '',
    sponsor: '',
    indication: '',
    isUnderWay: false,
    isComplete: false
  }

  fetchTrail = () => {
    let status = null
    if (this.state.isComplete && !this.state.isUnderWay) {
      status = 1
    }
    if (this.state.isUnderWay && !this.state.isComplete) {
      status = 2
    }

    this.props.fetchTrailList(this.page, 10, {
      'page': this.page,
      'pagesize': 10,
      'disease_id': this.categoryId,
      'indication_id': this.diseaseId,
      'province_id': this.provinceId,
      'city_id': this.cityId,
      'drug_name': this.state.medicineName,
      'sponsor_name': this.state.sponsor,
      'trials_status': status
    })
  }

  leaveMessage = () => {
    this.props.history.push('/leave-message')
  }

  handleScroll = () => {
    let body = document.body
    let scrollHeight = body.scrollHeight
    let scrollTop = document.documentElement.scrollTop || body.scrollTop
    if (window.screen.availHeight + scrollTop >= scrollHeight) {
      if (this.isFetching) return
      if (this.props.trailList.hasMore) {
        this.isFetching = true
        this.page++
        this.fetchTrail()
      }
    }
  }

  componentWillMount() {
    const {match} = this.props
    let {categoryId, diseaseId, provinceId, cityId} = match.params
    if (diseaseId == 'null') diseaseId = ''
    if (provinceId == 'null') provinceId = ''
    if (cityId == 'null') cityId = ''

    this.categoryId = categoryId
    this.diseaseId = diseaseId
    this.provinceId = provinceId
    this.cityId = cityId
  }

  search = () => {
    this.page = 0
    this.fetchTrail()
  }

  componentDidMount() {
    this.fetchTrail()
    if (!this.props.diseaseCategory.loaded) {
      this.props.fetchDiseaseCategory()
    }
    if (!this.props.provinceCity.loaded) {
      this.props.fetchProvinceCity()
    }

    document.addEventListener('scroll', this.handleScroll)
  }

  componentWillReceiveProps(nextProps: InstitutionProps) {
    if (!this.props.trailList.loaded && nextProps.trailList.loaded) {
      this.isFetching = false
    }
  }

  componentWillUnmount() {
    document.removeEventListener('scroll', this.handleScroll)
  }

  render() {
    const diseaseCategory = this.props.diseaseCategory.data || []
    const provinceCity = this.props.provinceCity.data || []
    let diseaseName = '', provinceName = '', cityName = ''
    let matchCategory = diseaseCategory.find(c => c['id'] == this.categoryId)
    if (matchCategory) {
      if (!this.diseaseId) {
        diseaseName = matchCategory['name']
      } else {
        let matchDisease = matchCategory['indication'].find(d => d['indication_id'] == this.diseaseId)
        if (matchDisease) {
          diseaseName = matchDisease['indication_name']
        }
      }
    }
    if (this.provinceId) {
      let matchProvince = provinceCity.find(p => p['province_id'] == this.provinceId)
      if (matchProvince) {
        provinceName = matchProvince['alias_name']
        if (this.cityId) {
          cityName = matchProvince.city.find(c => c['city_id'] == this.cityId)['city_name']
        }
      }
    }

    let list = this.props.trailList.list

    return (
      <div className="institution-page">
        <div className="disease-and-area">
          <div>{diseaseName}</div>
          <div className="area">{provinceName}{cityName}</div>
        </div>
        <div className="search-box">
          <div className="search-box-form">
            <div className="item medicine-name">
              <label>药物名称</label>
              <input value={this.state.medicineName} onChange={e => this.setState({medicineName: e.target.value})}/>
            </div>
            <div className="item sponsor">
              <label>申办者</label>
              <input value={this.state.sponsor} onChange={e => this.setState({sponsor: e.target.value})}/>
            </div>
            <div className="item indication">
              <label>试验状态</label>
              <CheckBox checked={this.state.isUnderWay} onChange={v => this.setState({isUnderWay: v})}>进行中</CheckBox>
              <CheckBox checked={this.state.isComplete} onChange={v => this.setState({isComplete: v})}>已完成</CheckBox>
            </div>
          </div>
          <div className="search-btn-container">
            <button onClick={this.search}>查询</button>
          </div>
        </div>

        {
          this.props.trailList.loading && (
            <div className="loading-ui">
              <Spinner/>
            </div>
          )
        }

        <div className="trail-list">
          {
            list.map((item, index) => {
              return (
                <div key={index} className="trail-item">
                  <header>{item['involved_name']}：</header>
                  <div className="trail-item-body">
                    <div className="body-item">
                      药物名称：
                      <div>{item['drug_name']}</div>
                    </div>
                    <div className="body-item">
                      主要研究者：
                      <div>{item['researcher_name']}</div>
                    </div>
                    <div className="body-item">
                      试验状态：
                      <div>{item['sinfo']}</div>
                    </div>
                    <div className="body-item">
                      申办者：
                      <div>{item['sponsor_name']}</div>
                    </div>
                    <div className="body-item">
                      联系电话：
                      <div>{item['contact_mobile']}</div>
                    </div>
                  </div>
                </div>
              )
            })
          }

        </div>
        <div className="leave-message">
          <button onClick={this.leaveMessage}>留言</button>
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    trailList: state.trailList,
    diseaseCategory: state.diseaseCategory,
    provinceCity: state.provinceCity
  }
}

export default connect(mapStateToProps, {fetchTrailList, fetchDiseaseCategory, fetchProvinceCity})(Institution)
