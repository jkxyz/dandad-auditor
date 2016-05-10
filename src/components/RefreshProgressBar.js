import React from 'react'
import { connect } from 'react-redux'

let mapStateToProps = state => {
  return {
    getProgress (prefix) {
      let { done, total } = state[prefix].progress
      return (done / total) * 100 + '%'
    },
    getIsRefreshing (prefix) {
      return state[prefix].isRefreshing
    }
  }
}

let mapDispatchToProps = dispatch => {
  return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(
  ({ className, prefix, getProgress, getIsRefreshing }) =>
    !getIsRefreshing(prefix) ? null :
      <div className={ className + ' uk-progress' }>
        <div className='uk-progress-bar' style={ { width: getProgress(prefix) } }></div>
      </div>
)
