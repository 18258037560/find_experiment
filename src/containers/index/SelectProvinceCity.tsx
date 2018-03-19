/**
 * Created by jiangyukun on 2017/11/16.
 */
import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import {connect} from 'react-redux'
import Modal from 'app-core/modal/Modal'

import Popup from '../../components/Popup'

import Data from '../../interfaces/Data'
import {fetchProvinceCity} from '../../commons/app.action'

interface SelectProvinceCityProps {
  categoryId: string
  diseaseId: string
  fetchProvinceCity: () => void
  provinceCity: Data<any>
  onExited: () => void
}

class SelectProvinceCity extends React.Component<SelectProvinceCityProps> {
  static contextTypes = {
    router: PropTypes.any
  }

  state = {
    show: true,
    currentProvince: '',
    currentCity: ''
  }

  close = () => {
    this.setState({show: false})
  }

  handleConfirm = () => {
    let {categoryId, diseaseId} = this.props
    let {currentProvince, currentCity} = this.state
    if (!diseaseId) diseaseId = 'null'
    if (!currentProvince) currentProvince = 'null'
    if (!currentCity) currentCity = 'null'
    this.close()
    this.context.router.history.push(`/institution/${categoryId}/${diseaseId}/${currentProvince}/${currentCity}`)
  }

  componentDidMount() {
    if (!this.props.provinceCity.loaded) {
      this.props.fetchProvinceCity()
    }
  }

  render() {
    let provinceCity = this.props.provinceCity.data || []
    let cityList = []
    if (this.state.currentProvince != '') {
      cityList = provinceCity.find(d => d['province_id'] == this.state.currentProvince).city
    }
    return (
      <Modal show={this.state.show} onHide={this.close} onExited={this.props.onExited}
             contentComponent={Popup} className="select-province-city"
      >
        <header className="header">
          <span className="title">选择项目地区</span>
          <div className="flex1"></div>
          <div>
            <button onClick={this.close}>取消</button>
            <button onClick={this.handleConfirm}>确定</button>
          </div>
        </header>
        <main className="select-box">
          <div className="select-province" onTouchMove={e => e.stopPropagation()}>
            {
              provinceCity.map(province => {
                const provinceId = province['province_id']
                return (
                  <div key={provinceId} className={classnames('province-item', {'selected': this.state.currentProvince == provinceId})}
                       onClick={() => this.setState({currentProvince: provinceId, currentCity: ''})}>
                    {province['alias_name']}
                  </div>
                )
              })
            }
          </div>
          <div className="select-city" onTouchMove={e => e.stopPropagation()}>
            {
              cityList.length != 0 && cityList.map(city => {
                const cityId = city['city_id']
                return (
                  <div key={cityId} className={classnames('city-item', {'selected': this.state.currentCity == cityId})}
                       onClick={() => this.setState({currentCity: cityId})}>
                    {city['city_name']}
                  </div>
                )
              })
            }
          </div>
        </main>
      </Modal>
    )
  }
}

function mapStateToProps(state) {
  return {
    provinceCity: state.provinceCity
  }
}

export default connect(mapStateToProps, {fetchProvinceCity})(SelectProvinceCity)
