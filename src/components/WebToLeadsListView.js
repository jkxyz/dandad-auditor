import React from 'react'
import { connect } from 'react-redux'
import ViewSelector from './ViewSelector'
import LoginButton from './LoginButton'
import fetchWebToLeads from '../actions/fetchWebToLeads'
import arrayToCsv from '../utils/arrayToCsv'

let mapStateToProps = state => {
  return {
    webToLeads: state.webToLeads.list,
    isRefreshDisabled: state.webToLeads.isRefreshing || !state.session.isLoggedIn,
    isRefreshing: state.webToLeads.isRefreshing,
    progressDone: state.webToLeads.progress.done,
    progressTotal: state.webToLeads.progress.total,
    handleDownload () {
      let csv = arrayToCsv(state.webToLeads.list)
      let anchor = document.createElement('a')

      anchor.href = 'data:text/csv;charset=UTF-8,' + encodeURI(csv)
      anchor.download = `Web to Leads ${Date.now()}`

      anchor.click()
    }
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
  ({ webToLeads, isRefreshDisabled, isRefreshing, progressDone, progressTotal, handleRefresh, handleDownload }) => {
    let progressBar = isRefreshing ? (
        <div className='uk-progress uk-margin'>
          <div
            className='uk-progress-bar'
            style={ {width: (progressDone/progressTotal) * 100 + '%'} }>
          </div>
        </div>
      ) : null

    return (
      <div className='uk-container uk-container-center'>
        <div className='uk-margin-top'>
          <ViewSelector current='Web to Leads' />
          <a className='uk-button uk-margin-left' onClick={ handleDownload }>
            Download CSV
          </a>
          <button
            className='uk-button uk-button-primary uk-margin-left'
            onClick={ handleRefresh }
            disabled={ isRefreshDisabled }>
            { isRefreshing ? <i className='uk-icon-refresh uk-icon-spin uk-margin-right' /> : null }
            Refresh
          </button>
          <LoginButton className='uk-float-right' />
        </div>
        { progressBar }
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
