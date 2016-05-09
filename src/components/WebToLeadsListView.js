import React from 'react'
import { connect } from 'react-redux'
import ViewSelector from './ViewSelector'
import LoginButton from './LoginButton'
import fetchWebToLeads from '../actions/fetchWebToLeads'

let mapStateToProps = state => {
  return {
    webToLeads: state.webToLeads.list,
    isRefreshDisabled: state.webToLeads.isRefreshing || !state.session.isLoggedIn,
    isRefreshing: state.webToLeads.isRefreshing
  }
}

let mapDispatchToProps = dispatch => {
  return {
    handleRefresh () {
      dispatch(fetchWebToLeads())
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(
  ({ webToLeads, isRefreshDisabled, isRefreshing, handleRefresh }) => {
    return (
      <div className='uk-container uk-container-center'>
        <div className='uk-margin-top'>
          <ViewSelector current='Web to Leads' />
          <button
            className='uk-button uk-button-primary uk-margin-left'
            onClick={ handleRefresh }
            disabled={ isRefreshDisabled }>
            { isRefreshing ? <i className='uk-icon-refresh uk-icon-spin uk-margin-right' /> : null }
            Refresh
          </button>
          <LoginButton className='uk-float-right' />
        </div>
        <table className='uk-table'>
          <thead>
            <tr>
              <th>ID</th>
              <th>Page Slug</th>
              <th>Title</th>
              <th>Tracking Code</th>
              <th>SalesForce List ID</th>
              <th>Subject</th>
            </tr>
          </thead>
          <tbody>
            { webToLeads.map(webToLead => (
              <tr key={ webToLead.id }>
                <td>{ webToLead.id }</td>
                <td>{ webToLead.pageSlug }</td>
                <td>{ webToLead.title }</td>
                <td>{ webToLead.trackingCode }</td>
                <td>{ webToLead.salesforceListId }</td>
                <td>{ webToLead.subject }</td>
              </tr>
            )) }
          </tbody>
        </table>
      </div>
    )
  }
)
