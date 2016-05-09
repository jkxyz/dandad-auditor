import React from 'react'
import { connect } from 'react-redux'
import fetchWebToLeads from '../actions/fetchWebToLeads'
import Header from './Header'
import DownloadCSVButton from './DownloadCSVButton'
import RefreshButton from './RefreshButton'
import RefreshProgressBar from './RefreshProgressBar'

let mapStateToProps = state => {
  return {
    webToLeads: state.webToLeads.list
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
  ({ webToLeads, handleRefresh }) => {
    return (
      <div className='uk-container uk-container-center'>
        <Header currentView='Web to Leads'>
          <DownloadCSVButton
            className='uk-margin-left'
            data={ webToLeads }
            filePrefix='Web to Leads'
          />
          <RefreshButton
            className='uk-margin-left'
            onClick={ handleRefresh }
            prefix='webToLeads'
          />
        </Header>
        <RefreshProgressBar prefix='webToLeads' />
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
