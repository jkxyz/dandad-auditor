require.config({
  paths: {
    'react': '../vendor/react-with-addons',
    'react-dom': '../vendor/react-dom',
    'redux': '../vendor/redux',
    'react-redux': '../vendor/react-redux',
    'JSXTransformer': '../vendor/JSXTransformer',
    'text': '../vendor/requirejs-text',
    'jsx': '../vendor/requirejs-jsx'
  },
  jsx: {
    fileExtension: '.jsx'
  }
});

require(['react', 'react-dom', 'react-redux', 'redux', 'reducer', 'jsx!components/App'], function (React, ReactDOM, ReactRedux, Redux, reducer, App) {
  
  var store = Redux.createStore(reducer);

  ReactDOM.render(
    React.createElement(ReactRedux.Provider, { store: store }, React.createElement(App, null, null)),
    document.getElementById('main')
  );

});
