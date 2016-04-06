define(['redux'], (Redux) => {
  'use strict';

  const initialState = {
    username: null
  };

  const reducer = (state = initialState, action) => {
    switch (action.type) {
      case 'login': return Object.assign({}, state, {username: action.username});
      case 'route': return Object.assign({}, state, {currentPath: action.path});
    }

    return state;
  };

  const store = Redux.createStore(reducer);

  fetch('/api/login').then(res => res.text()).then(username => store.dispatch({type: 'login', username}));

  return store;
});