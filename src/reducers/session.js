import { LOGIN_START, LOGIN_END } from '../actions/login'

const INITIAL_STATE = {
  isLoggedIn: false,
  isLoggingIn: false,
  username: null
};

export default function session (state = INITIAL_STATE, action) {
  switch (action.type) {
  case LOGIN_START:
    return { ...state, isLoggingIn: true };

  case LOGIN_END:
    return { ...state, isLoggingIn: false, isLoggedIn: !!action.username, username: action.username };

  default:
    return state;
  }
}