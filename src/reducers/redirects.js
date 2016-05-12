import {
  FETCH_REDIRECTS_START,
  FETCH_REDIRECTS_END,
  FETCH_REDIRECTS_PROGRESS
} from '../actions/fetchRedirects'
import { INIT_REDIRECTS } from '../actions/init'

const INITIAL_STATE = {
  list: [],
  isRefreshing: true,
  progress: { done: 0, total: null }
}

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case FETCH_REDIRECTS_START:
    return {
      ...state,
      isRefreshing: true,
      progress: { done: 0, total: action.total }
    }

  case FETCH_REDIRECTS_END:
    return {
      ...state,
      isRefreshing: false,
      list: action.redirects
    }

  case FETCH_REDIRECTS_PROGRESS:
    return {
      ...state,
      progress: { ...state.progress, done: state.progress.done + 1 }
    }

  case INIT_REDIRECTS:
    return {
      ...state,
      isRefreshing: false,
      list: action.redirects
    }

  default:
    return state
  }
}
