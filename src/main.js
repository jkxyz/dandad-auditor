require.config({
  paths: {
    'react': '../vendor/react-with-addons',
    'react-dom': '../vendor/react-dom',
    'redux': '../vendor/redux',
    'react-redux': '../vendor/react-redux',
    'JSXTransformer': '../vendor/JSXTransformer',
    'text': '../vendor/requirejs-text',
    'jsx': '../vendor/requirejs-jsx',
    'react-router': '../vendor/react-router'
  }
});

require(
  ['react', 'react-dom', 'react-redux', 'jsx!./components/Routes', './reducers'],
  (React, ReactDOM, ReactRedux, Routes, {store}) => {
    'use strict';

    ReactDOM.render(
      React.createElement(ReactRedux.Provider, {store}, React.createElement(Routes, null, null)),
      document.getElementById('main')
    );
  }
);