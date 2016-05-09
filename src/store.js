import { createStore, combineReducers, applyMiddleware } from 'redux'
import pages from './reducers/pages'
import session from './reducers/session'
import webToLeads from './reducers/webToLeads'
import initAction from './actions/init'

const store = createStore(
  combineReducers({ session, pages, webToLeads }),
  applyMiddleware(
    // Source: https://github.com/gaearon/redux-thunk
    ({ dispatch, getState }) => next => action => typeof action === 'function' ? action(dispatch, getState) : next(action)
  )
)

export default store

store.dispatch(initAction())
