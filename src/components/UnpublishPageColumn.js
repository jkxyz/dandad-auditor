import React from 'react'
import { connect } from 'react-redux'
import unpublishPage from '../actions/unpublishPage'

let mapStateToProps = state => {
  return {
    getDisabled (page) {
      return !page.isPublished || state.pages.isUnpublishing || !state.session.isLoggedIn
    }
  }
}

let mapDispatchToProps = dispatch => {
  return {
    handleUnpublish (page) {
      UIkit.modal.prompt('Redirect page to URL (leave empty for none):', '', (redirectTo) => {
        dispatch(unpublishPage(page, redirectTo || null))
      })
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(
  ({ page, getDisabled, handleUnpublish }) => (
    getDisabled(page) ? <td></td> :
      <td
        title='Unpublish page'
        style={ { cursor: 'pointer' } }
        onClick={ () => handleUnpublish(page) }>
        <i className='uk-icon-remove' style={ { color: '#888' } } />
      </td>
  )
)
