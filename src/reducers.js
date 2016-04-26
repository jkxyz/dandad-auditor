import {createStore, combineReducers, applyMiddleware} from 'npm:redux'
import {LOGIN_START, LOGIN_END, FETCH_PAGES_START, FETCH_PAGES_END, init} from './actions';

const INITIAL_STATE = {
  session: {isLoggedIn: false, isLoggingIn: false, username: null},
  pages: {isRefreshingPages: false, pagesList: [], sortColumn: null, sortDirection: null}
};

function session(state = INITIAL_STATE.session, action) {
  switch(action.type) {
    case LOGIN_START:
      return Object.assign({}, state, {isLoggingIn: true});

    case LOGIN_END:
      return Object.assign({}, state, {isLoggingIn: false, isLoggedIn: !!action.username, username: action.username});

    default:
      return state;
  }
}

function pages(state = INITIAL_STATE.pages, action) {
  switch (action.type) {
    case FETCH_PAGES_START:
      return Object.assign({}, state, {isRefreshingPages: true});

    case FETCH_PAGES_END:
      return Object.assign({}, state, {isRefreshingPages: false, pagesList: action.pages});

    default:
      return state;
  }
}

export let store = createStore(
  combineReducers({session, pages}),
  // Source: https://github.com/gaearon/redux-thunk
  applyMiddleware(
    ({dispatch, getState}) => next => action => typeof action === 'function' ? action(dispatch, getState) : next(action)
  )
);

store.dispatch(init());