import React from 'react'
import { connect } from 'react-redux'

let mapStateToProps = state => {
  return {
    getIsDisabled (prefix) {
      return state[prefix].isRefreshing || !state.session.isLoggedIn
    },
    getIsRefreshing (prefix) {
      return state[prefix].isRefreshing
    }
  }
}

let mapDispatchToProps = dispatch => {
  return {}
}

let _RefreshingIcon = ({ isRefreshing }) => {
  if (!isRefreshing) {
    return null
  }

  return <i className='uk-icon-refresh uk-icon-spin uk-margin-right' />
}

export default connect(mapStateToProps, mapDispatchToProps)(
  ({ className, onClick, prefix, getIsDisabled, getIsRefreshing }) => {
    return (
      <button
        className={ className + ' uk-button uk-button-primary' }
        onClick={ onClick }
        disabled={ getIsDisabled(prefix) }>
        <_RefreshingIcon isRefreshing={ getIsRefreshing(prefix) } />
        Refresh
      </button>
    )
  }
)
