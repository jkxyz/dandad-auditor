require.config({
  paths: {
    'react': '../vendor/react-with-addons'
  , 'react-dom': '../vendor/react-dom'
  , 'redux': '../vendor/redux'
  , 'react-redux': '../vendor/react-redux'
  , 'JSXTransformer': '../vendor/JSXTransformer'
  , 'text': '../vendor/requirejs-text'
  , 'jsx': '../vendor/requirejs-jsx'
  }
, jsx: { fileExtension: '.jsx', harmony: true }
})

require(['react', 'react-dom', 'react-redux', 'redux', 'jsx!components/App'], function (React, ReactDOM, ReactRedux, Redux, App) {

  var initialState = {
    login: { isLoggedIn: false, isLoggingIn: false, username: null }
  , isRefreshingPages: false
  }
  
  var store = Redux.createStore(function (state, action) {

    if (typeof state === 'undefined') {
      return initialState
    }

    switch (action.type) {

      case 'userLogin':
        return Object.assign({}, state, { login: { isLoggedIn: true, username: action.username } })

      case 'userStartLogin':
        return Object.assign({}, state, { login: { isLoggingIn: true } })

      case 'userEndLogin':
        return Object.assign({}, state, { login: { isLoggingIn: false } })

      case 'refreshPagesStart':
        return Object.assign({}, state, { isRefreshingPages: true })

      case 'refreshPagesEnd':
        return Object.assign({}, state, { isRefreshingPages: false, pages: action.pages })

    }

  })

  // Check whether the user is currently logged in to the CMS
  $.ajax('/api/login').success(function (username) {
    store.dispatch({ type: 'userLogin', username: username })
  })

  // Render out the main `App` component within the Redux `Provider` which gives nested
  // components access to the application state reducer
  ReactDOM.render(
    React.createElement(ReactRedux.Provider, { store: store }, React.createElement(App, null, null)),
    document.getElementById('main')
  )

})
