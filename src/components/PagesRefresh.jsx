define(['react', 'react-redux', '../utils/fetchPages'], (React, ReactRedux, fetchPages) => {

  'use strict'

  const PagesRefresh = ({ disabled, isRefreshing, onButtonClick }) => {

    return (
      <button type='button' className='uk-button uk-button-success' onClick={onButtonClick} disabled={disabled}>
        {isRefreshing ? 'Fetching pages...' : 'Refresh Pages'}
      </button>
    )

  }

  const mapStateToProps = state => {

    return {

      disabled:     state.isRefreshingPages || !state.login.isLoggedIn
    , isRefreshing: state.isRefreshingPages

    }

  }

  const mapDispatchToProps = dispatch => {

    return {

      onButtonClick: () => {
        
        dispatch({ type: 'refreshPagesStart' })

        fetchPages().done(pages => {

          localStorage.dandadAuditorPages = JSON.stringify(pages)

          dispatch({ type: 'refreshPagesEnd', pages })

        })

      }

    }

  }

  return ReactRedux.connect(mapStateToProps, mapDispatchToProps)(PagesRefresh)

})
