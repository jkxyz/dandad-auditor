define(
  ['react', 'react-router', 'jsx!./PagesListView'],
  (React, {Router, Route, hashHistory, IndexRedirect}, PagesListView) => {
    'use strict';

    return () => {
      return (
        <Router history={hashHistory}>
          <Route path='/' component={PagesListView} />
          <Route path='*'><IndexRedirect to='/' /></Route>
        </Router>
      );
    };
  }
);