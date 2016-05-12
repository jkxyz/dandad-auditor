import React from 'react'
import { Router, hashHistory, Route, IndexRedirect } from 'react-router'
import PagesListView from './PagesListView'
import WebToLeadsListView from './WebToLeadsListView'
import RedirectsListView from './RedirectsListView'

export default () =>
  <Router history={ hashHistory }>
    <Route path='/' component={ PagesListView } />
    <Route path='/redirects' component={ RedirectsListView } />
    <Route path='/components/web-to-leads' component={ WebToLeadsListView } />
    <Route path='*'><IndexRedirect to='/' /></Route>
  </Router>
