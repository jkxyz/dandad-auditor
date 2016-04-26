import React from 'npm:react'
import {Router, hashHistory, Route, IndexRedirect} from 'npm:react-router'
import PagesListView from './PagesListView'

export default () => {
  return (
    <Router history={hashHistory}>
      <Route path='/' component={PagesListView} />
      <Route path='*'><IndexRedirect to='/' /></Route>
    </Router>
  )
}