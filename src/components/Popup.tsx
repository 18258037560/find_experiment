/**
 * Created by jiangyukun on 2017/11/16.
 */
import React from 'react'
import classnames from 'classnames'
import Transition from 'app-core/modal/Transition'

export default (props) => {
  return (
    <Transition show={props.show}>
      <div className={classnames('my-modal-content popup', props.className)}>
        {props.children}
      </div>
    </Transition>
  )
}
