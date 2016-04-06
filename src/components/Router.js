define(['react', 'react-redux', 'react-router', 'jsx!./App', 'jsx!./PagesList'],
  (React, ReactRedux, ReactRouter, App, PagesList) => {
    'use strict';

    const {Route, IndexRoute, IndexRedirect} = ReactRouter;

    return () => {
      return (
        <ReactRouter.Router history={ReactRouter.hashHistory}>
          <Route path="/" component={App}>
            <IndexRoute component={PagesList} />
          </Route>
          <Route path="*"><IndexRedirect to="/" /></Route>
        </ReactRouter.Router>
      );
    };
  }
);