import React from 'react'
import { connect } from 'react-redux'
import Header from './Header'
import DownloadCSVButton from './DownloadCSVButton'
import RefreshButton from './RefreshButton'
import fetchPages from '../actions/fetchPages'
import RefreshProgressBar from './RefreshProgressBar'

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
  ({ pages, handleRefresh }) => {
    return (
      <div className='uk-container uk-container-center'>
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
        <table className='uk-table'>
          <thead>
            <tr>
              <th>ID</th>
              <th>Title</th>
              <th>Slug</th>
              <th>Type</th>
              <th>Published?</th>
              <th>Restricted?</th>
            </tr>
          </thead>
          <tbody>
            { pages.map(page => (
              <tr key={ page.id }>
                <td>{ page.id }</td>
                <td>{ page.title }</td>
                <td>{ page.slug }</td>
                <td>{ page.contentType }</td>
                <td>{ page.isPublished ? 'Yes' : 'No' }</td>
                <td>{ page.isRestricted ? 'Yes' : 'No' }</td>
              </tr>
            )) }
          </tbody>
        </table>
      </div>
    )
  }
)
