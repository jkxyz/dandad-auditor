define(['redux'], (Redux) => {
  'use strict';

  const initialState = {
    username: null
  , allPages: JSON.parse(window.localStorage.dandadAuditorPages || '[]')
  };

  const reducer = (state = initialState, action) => {
    console.log(action);

    switch (action.type) {
      case 'login': return Object.assign({}, state, {username: action.username});
    }

    return state;
  };

  const store = Redux.createStore(reducer);

  fetch('/api/login')
    // Resolve with the logged in username or null
    .then(res => (res.status === 200 && res.text()) || null)
    .then(username => store.dispatch({type: 'login', username}));

  return store;
});