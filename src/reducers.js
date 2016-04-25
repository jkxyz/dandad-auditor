define(
  ['redux', './actions'],
  (Redux, {initUsername, initPages}) => {
    'use strict';

    function session(state = {isLoggedIn: false, isLoggingIn: false, username: null}, action) {
      switch (action.type) {
        case 'LOGIN_START':
          return Object.assign({}, state, {isLoggingIn: true});
        case 'LOGIN_END':
          return Object.assign({}, state, {isLoggingIn: false, isLoggedIn: !!action.username, username: action.username});
        default:
          return state;
      }
    }

    function pages(state = {isRefreshingPages: false, pagesList: []}, action) {
      switch (action.type) {
        case 'FETCH_PAGES_START':
          return Object.assign({}, state, {isRefreshingPages: true});
        case 'FETCH_PAGES_END':
          return Object.assign({}, state, {isRefreshingPages: false, pagesList: action.pages});
        default:
          return state;
      }
    }

    const store = Redux.createStore(
      Redux.combineReducers({session, pages}),
      // Source: https://github.com/gaearon/redux-thunk
      // Handle thunks: actions with asynchronous side-effects
      Redux.applyMiddleware(({dispatch, getState}) => {
        return next => action => {
          if (typeof action === 'function') return action(dispatch, getState);
          return next(action);
        };
      })
    );

    store.dispatch(initUsername());
    store.dispatch(initPages());

    return {store};
  }
);