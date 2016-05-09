import { LOGIN_START, LOGIN_END } from '../actions/login'
import { INIT_LOGIN } from '../actions/init'

const INITIAL_STATE = {
  isLoggedIn: false,
  isLoggingIn: true,
  username: null
}

export default function session (state = INITIAL_STATE, action) {
  switch (action.type) {
  case LOGIN_START:
    return { ...state, isLoggingIn: true }

  case LOGIN_END:
    return {
      ...state,
      isLoggingIn: false,
      isLoggedIn: !!action.username,
      username: action.username
    }

  case INIT_LOGIN:
    return {
      ...state,
      isLoggingIn: false,
      isLoggedIn: !!action.username,
      username: action.username
    }

  default:
    return state
  }
}
