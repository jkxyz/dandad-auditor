define(['react', 'react-redux'], (React, ReactRedux) => {

  const PagesRefresh = ({ disabled, isRefreshing, onButtonClick }) => {

    return <button type='button' className='uk-button uk-button-success' onClick={onButtonClick} disabled={disabled}>
      {isRefreshing ? 'Fetching pages...' : 'Refresh Pages'}
    </button>

  }

  const mapStateToProps = state => {
    return {
      disabled: state.isRefreshingPages || !state.login.isLoggedIn
    , isRefreshing: state.isRefreshingPages
    }
  }

  const mapDispatchToProps = dispatch => {
    return {

      onButtonClick: e => {
        
        dispatch({ type: 'refreshPagesStart' })

        setTimeout(() => { dispatch({ type: 'refreshPagesEnd' }) }, 2000)

      }

    }
  }

  return ReactRedux.connect(mapStateToProps, mapDispatchToProps)(PagesRefresh)

})
