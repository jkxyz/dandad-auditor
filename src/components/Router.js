define(['react', 'react-redux', 'react-router', 'jsx!./App', 'jsx!./PagesList'], (React, ReactRedux, ReactRouter, App, PagesList) => {
  'use strict';

  const {Route, IndexRoute} = ReactRouter;

  return function Router () {
    return (
      <ReactRouter.Router history={ReactRouter.hashHistory}>
        <Route path="/" component={App}>
          <IndexRoute component={PagesList} />
          <Route path="search" component={App} />
        </Route>
      </ReactRouter.Router>
    );
  };
});