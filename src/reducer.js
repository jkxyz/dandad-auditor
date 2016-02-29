define([], function () {

  var initialState = {
    isLoggedIn: false,
    loggedInUsername: null
  };
  
  return function (state, action) {

    if (typeof state === 'undefined') {
      return initialState;
    }

    switch (action.type) {
      case 'USER_LOGGED_IN':
        return Object.assign({}, state, { isLoggedIn: true, loggedInUsername: action.username });
    }

    return state;

  };

});
