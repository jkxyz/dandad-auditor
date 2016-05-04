import React from 'react'
import { connect } from 'react-redux'
import ViewSelector from './ViewSelector'
import LoginButton from './LoginButton'

let WebToLeadsListView = () => {
  return (
    <div className='uk-container uk-container-center'>
      <div className='uk-margin-top'>
        <ViewSelector current='Web to Lead Forms' />
        <button
          className='uk-button uk-button-primary uk-margin-left'>
          Refresh
        </button>
        <LoginButton className='uk-float-right' />
      </div>
    </div>
  )
};

let mapStateToProps = state => {
  return {}
};

let mapDispatchToProps = dispatch => {
  return {}
};

export default connect(mapStateToProps, mapDispatchToProps)(WebToLeadsListView)