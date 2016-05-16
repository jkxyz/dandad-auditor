import React from 'react'
import { connect } from 'react-redux'
import Header from './Header'
import DownloadCSVButton from './DownloadCSVButton'
import RefreshButton from './RefreshButton'
import fetchPages from '../actions/fetchPages'
import RefreshProgressBar from './RefreshProgressBar'
import ListTable from './ListTable'
import UnpublishPageColumn from './UnpublishPageColumn'

let mapStateToProps = state => {
  return {
    pages: state.pages.list
  }
}

let mapDispatchToProps = dispatch => {
  return {
    handleRefresh () {
      dispatch(fetchPages())
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(
  ({ pages, handleRefresh, handleUnpublish }) => (
    <div className='uk-margin-left uk-margin-right'>
      <Header currentView='Pages'>
        <DownloadCSVButton
          className='uk-margin-left'
          data={ pages }
          filePrefix='Pages'
        />
        <RefreshButton
          className='uk-margin-left'
          onClick={ handleRefresh }
          prefix='pages'
        />
      </Header>
      <RefreshProgressBar prefix='pages' />
      <ListTable
        prefix='pages'
        columns={ {
          id: 'ID',
          title: 'Title',
          slug: 'Slug',
          contentType: 'Type',
          isPublished: 'Published?',
          isRestricted: 'Restricted?'
        } }
        extraColumns={ [ (page) => (
          <UnpublishPageColumn
            key={ `unpublish-page-${page}` }
            page={ page }
          />
        ) ] }
      />
    </div>
  )
)
