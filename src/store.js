import { createStore, combineReducers, applyMiddleware } from 'redux'
import pages from './reducers/pages'
import session from './reducers/session'
import webToLeads from './reducers/webToLeads'
import redirects from './reducers/redirects'
import initAction from './actions/init'

// Source: https://github.com/gaearon/redux-thunk
let thunkMiddleware = ({ dispatch, getState }) => next => action =>
  typeof action === 'function'
    ? action(dispatch, getState)
    : next(action)

let store = createStore(
  combineReducers({ session, pages, webToLeads, redirects }),
  applyMiddleware(thunkMiddleware)
)

export default store

store.dispatch(initAction())
