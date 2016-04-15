define(['redux', './utils/fetchPages'], (Redux, fetchPages) => {
  'use strict';

  const initialState = {
    username: null,
    allPages: JSON.parse(window.localStorage.dandadAuditorPages || '[]'),
    isRefreshingPages: false
  };

  const reducer = (state = initialState, action) => {
    console.log(action);

    switch (action.type) {
      case 'login':
        let formData = new FormData();

        formData.append('username', action.username);
        formData.append('password', action.password);

        fetch('/api/login', {method: 'POST', body: formData}).then(
          res => store.dispatch({type: 'loginComplete', success: res.status === 200, username: action.username})
        );

        break;

      case 'loginComplete':
        if (!action.success) {
          alert('There was an error signing in');
          break;
        }

        return Object.assign({}, state, {username: action.username});

      case 'initLogin':
        return Object.assign({}, state, {username: action.username});

      case 'refreshPages':
        fetchPages().then(pages => store.dispatch({type: 'refreshPagesComplete', pages}));

        return Object.assign({}, state, {isRefreshingPages: true});

      case 'refreshPagesComplete':
        return Object.assign({}, state, {isRefreshingPages: false, allPages: action.pages});
    }

    return state;
  };

  const store = Redux.createStore(reducer);

  fetch('/api/login')
    // Resolve with the logged in username or null
    .then(res => (res.status === 200 && res.text()) || null)
    .then(username => store.dispatch({type: 'initLogin', username}));

  return store;
});