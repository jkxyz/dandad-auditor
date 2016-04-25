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

    function pages(
      state = {
        isRefreshingPages: false,
        pagesList: [],
        sortColumn: null,
        sortDirection: null
      },
      action
    ) {
      switch (action.type) {
        case 'FETCH_PAGES_START':
          return Object.assign({}, state, {isRefreshingPages: true});
        case 'FETCH_PAGES_END':
          return Object.assign({}, state, {isRefreshingPages: false, pagesList: action.pages});
        case 'SORT_PAGES':
          // Toggle the sort direction for a column, otherwise sort descending
          const dir = action.column === state.sortColumn ? (state.sortDirection === 'ASC' ? 'DESC' : 'ASC') : 'DESC';
          const pages = state.pagesList.slice(0);
          pages.sort((a, b) => {
            if (a[action.column] < b[action.column]) {
              return dir === 'ASC' ? -1 : 1;
            }
            if (a[action.column] > b[action.column]) {
              return dir === 'ASC' ? 1 : -1;
            }
            return 0;
          });
          return Object.assign({}, state, {sortColumn: action.column, sortDirection: dir, pagesList: pages});
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
    store.dispatch({type: 'SORT_PAGES', column: 'id'});

    return {store};
  }
);