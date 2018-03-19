/**
 * Created by jiangyukun on 2017/11/17.
 */
import React from 'react'
import Modal from 'app-core/modal/Modal'
import SmallDialogContent from 'app-core/common/content/SmallDialogContent'

interface LeaveMessageConfirmProps {
  onExited: () => void

}

class LeaveMessageConfirm extends React.Component<LeaveMessageConfirmProps> {
  state = {
    show: true
  }

  close = () => {
    this.setState({show: false})
  }

  render() {
    return (
      <Modal
        className="leave-message-confirm-dialog"
        contentComponent={SmallDialogContent}
        show={this.state.show} onHide={this.close} onExited={this.props.onExited}
      >
        <Modal.Header>
          <Modal.Title>提示</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="success-message">
            感谢您的反馈，我们将尽快处理您的意见，如有必要将及时与您联系
          </div>
        </Modal.Body>
        <Modal.Footer>
          <button onClick={this.props.onExited}>返回查询结果</button>
        </Modal.Footer>
      </Modal>
    )
  }
}

export default LeaveMessageConfirm
