import React from 'react'
import { connect } from 'react-redux'
import Header from './Header'
import fetchRedirects from '../actions/fetchRedirects'
import RefreshButton from './RefreshButton'
import RefreshProgressBar from './RefreshProgressBar'
import ListTable from './ListTable'
import DownloadCSVButton from './DownloadCSVButton'

let mapStateToProps = state => {
  return {
    redirects: state.redirects.list
  }
}

let mapDispatchToProps = dispatch => {
  return {
    handleRefresh () {
      dispatch(fetchRedirects())
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(
  ({ redirects, handleRefresh }) => (
    <div className='uk-margin-left uk-margin-right'>
      <Header currentView='Redirects'>
        <DownloadCSVButton
          className='uk-margin-left'
          data={ redirects }
          filePrefix='Redirects'
        />
        <RefreshButton
          className='uk-margin-left'
          onClick={ handleRefresh }
          prefix={ 'redirects' }
        />
      </Header>
      <RefreshProgressBar prefix='redirects' />
      <ListTable
        prefix='redirects'
        columns={ { id: 'ID', from: 'From', to: 'To' } }
      />
    </div>
  )
)
