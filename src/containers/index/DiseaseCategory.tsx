/**
 * Created by jiangyukun on 2017/11/16.
 */
import React from 'react'
import classnames from 'classnames'

import HighLight from '../../components/HighLight'

interface DiseaseCategoryProps {
  currentCategoryId: string
  currentDiseaseId: string
  toggleOpen: (categoryId) => void
  onSelectDiseaseChange: (diseaseId) => void
  category: any
  searchKey: string
}

class DiseaseCategory extends React.Component<DiseaseCategoryProps> {
  render() {
    const {category, currentDiseaseId} = this.props
    const categoryId = category['id']
    let diseaseList = category['indication'] || []
    if (this.props.searchKey) {
      diseaseList = diseaseList.filter(item => item['indication_name'].indexOf(this.props.searchKey) != -1)
    }
    const isOpen = this.props.currentCategoryId == categoryId
    if (diseaseList.length == 0) {
      return null
    }
    return (
      <div className="disease-category">
        <header className={classnames('disease-header', {'open': isOpen})} onClick={() => this.props.toggleOpen(categoryId)}>
          {category['name']}
        </header>
        {
          isOpen && (
            <div className="disease-body">
              {
                diseaseList.map(disease => {
                  const diseaseId = disease['indication_id']
                  return (
                    <div
                      key={diseaseId}
                      className={classnames('disease-item', {'selected': currentDiseaseId == diseaseId})}
                      onClick={() => this.props.onSelectDiseaseChange(currentDiseaseId == diseaseId ? '' : diseaseId)}
                    >
                      <HighLight txt={disease['indication_name']} match={this.props.searchKey}/>
                    </div>
                  )
                })
              }
            </div>
          )
        }
      </div>
    )
  }
}

export default DiseaseCategory
