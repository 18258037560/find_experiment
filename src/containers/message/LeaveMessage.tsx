/**
 * Created by jiangyukun on 2017/11/17.
 */
import React from 'react'
import {connect} from 'react-redux'
import Alert from 'app-core/common/Alert'

import {leaveMessage} from '../../commons/app.action'
import RouteComponent from '../../interfaces/RouteComponent'
import LeaveMessageConfirm from './LeaveMessageConfirm'

interface LeaveMessageProps extends RouteComponent {
  leaveMessage: (content, contactInfo) => void
  leaveMessageSuccess: boolean
}

class LeaveMessage extends React.Component<LeaveMessageProps> {
  state = {
    content: '',
    contactInfo: '',
    showConfirm: false
  }

  confirm = () => {
    this.props.leaveMessage(this.state.content, this.state.contactInfo)
  }

  handleConfirm = () => {
    this.setState({showConfirm: false})
    this.props.history.goBack()
  }

  componentWillReceiveProps(nextProps: LeaveMessageProps) {
    if (!this.props.leaveMessageSuccess && nextProps.leaveMessageSuccess) {
      this.setState({showConfirm: true})
    }
  }

  render() {
    return (
      <div className="leave-message-page">
        {
          this.state.showConfirm && (
            <LeaveMessageConfirm onExited={this.handleConfirm}/>
          )
        }
        <div className="message-input-item">
          <label>留言内容</label>
          <div className="message-content-container">
            <textarea
              placeholder="请输入您的建议，或是疑问，最多不超过200字"
              value={this.state.content} onChange={e => this.setState({content: e.target.value.substr(0, 200)})}
            ></textarea>
          </div>
        </div>
        <div className="message-input-item">
          <label>联系方式</label>
          <div className="contact-info-container">
            <textarea placeholder="请输入您的电话、QQ、微信或邮箱"
                      value={this.state.contactInfo} onChange={e => this.setState({contactInfo: e.target.value})}
            ></textarea>
          </div>
        </div>

        <div className="confirm">
          <button disabled={!this.state.content || !this.state.contactInfo} onClick={this.confirm}>确认</button>
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    leaveMessageSuccess: state.app.leaveMessageSuccess
  }
}

export default connect(mapStateToProps, {leaveMessage})(LeaveMessage)
