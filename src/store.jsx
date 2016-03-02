define(['redux'], (Redux) => {

  const initialState = {
  
    login: {

      isLoggedIn:  false
    , isLoggingIn: false
    , username:    null

    }
  
  , isRefreshingPages: false

  , pages: []

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

    }

    return state

  }

  const store = Redux.createStore(reducer)

  $.ajax('/api/login').success(username => { store.dispatch({ type: 'userLogin', username }) })

  return store

})
