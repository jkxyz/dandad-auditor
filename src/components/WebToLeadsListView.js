import React from 'react'
import { connect } from 'react-redux'
import fetchWebToLeads from '../actions/fetchWebToLeads'
import Header from './Header'
import DownloadCSVButton from './DownloadCSVButton'
import RefreshButton from './RefreshButton'
import RefreshProgressBar from './RefreshProgressBar'
import ListTable from './ListTable'

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
      <div className='uk-margin-left uk-margin-right'>
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
        <ListTable
          prefix='webToLeads'
          columns={ {
            id: 'ID',
            pageSlug: 'Page Slug',
            title: 'Title',
            trackingCode: 'Tracking Code',
            salesforceListId: 'SalesForce List ID',
            subject: 'Subject'
          } }
        />
      </div>
    )
  }
)
