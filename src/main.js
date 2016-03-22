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

require(['react', 'react-dom', 'react-redux', './store', 'jsx!./components/App'], (React, ReactDOM, ReactRedux, store, App) => {

  'use strict'

  // Render out the main `App` component within the Redux `Provider` which gives nested
  // components access to the application state reducer
  ReactDOM.render(
    React.createElement(ReactRedux.Provider, { store: store }, React.createElement(App, null, null)),
    document.getElementById('main')
  )

})
