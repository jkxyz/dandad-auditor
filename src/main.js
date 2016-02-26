require.config({
  paths: {
    'react': '../vendor/react-with-addons',
    'react-dom': '../vendor/react-dom',
    'JSXTransformer': '../vendor/JSXTransformer',
    'text': '../vendor/requirejs-text',
    'jsx': '../vendor/requirejs-jsx'
  },
  jsx: {
    fileExtension: '.jsx'
  }
});

require(['react', 'react-dom', 'jsx!components/App'], function (React, ReactDOM, App) {
  ReactDOM.render(React.createElement(App, null, null), document.getElementById('main'));
});
