import { LOGIN_START, LOGIN_END } from '../actions/login'
import { INIT_LOGIN } from '../actions/init'

const INITIAL_STATE = {
  isLoggedIn: false,
  isLoggingIn: false,
  username: null,
  sessionId: null
}

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case LOGIN_START:
    return { ...state, isLoggingIn: true }

  case LOGIN_END:
    return {
      ...state,
      isLoggingIn: false,
      isLoggedIn: action.success,
      username: action.username,
      sessionId: action.sessionId
    }

  default:
    return state
  }
}
