define(['redux'], (Redux) => {

  'use strict'

  const initialState = {
  
    login: {

      isLoggedIn:  false
    , isLoggingIn: false
    , username:    null

    }
  
  , isRefreshingPages: false

  , pages: JSON.parse(localStorage.dandadAuditorPages || '[]')

  , sortColumn: null
  , sortDirection: 'ASC'

  }

  const reducer = (state = initialState, action) => {

    switch (action.type) {

      case 'userLogin':
        return Object.assign({}, state, { login: { isLoggedIn: true, username: action.username } })

      case 'userStartLogin':
        return Object.assign({}, state, { login: { isLoggingIn: true } })

      case 'userEndLogin':
        return Object.assign({}, state, { login: { isLoggingIn: false } })

      case 'refreshPagesStart':
        return Object.assign({}, state, { isRefreshingPages: true })

      case 'refreshPagesEnd':
        return Object.assign({}, state, { isRefreshingPages: false, pages: action.pages })

      case 'toggleSortColumn':
        // If the toggled column is not the active sort column, then switch to sorting by the
        // new field. Otherwise, toggle the sort direction for the current column.
        if (action.column !== state.sortColumn) {

          return Object.assign({}, state, { sortColumn: action.column, sortDirection: 'ASC' })

        }

        return Object.assign({}, state, { sortDirection: state.sortDirection === 'ASC' ? 'DESC' : 'ASC' })

    }

    return state

  }

  const store = Redux.createStore(reducer)

  $.ajax('/api/login').success(username => { store.dispatch({ type: 'userLogin', username }) })

  return store

})
