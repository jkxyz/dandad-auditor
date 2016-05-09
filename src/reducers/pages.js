import {
  FETCH_PAGES_START,
  FETCH_PAGES_END,
  FETCH_PAGES_PROGRESS
} from '../actions/fetchPages'

import { INIT_PAGES } from '../actions/init'

const INITIAL_STATE = {
  list: [],
  isRefreshing: true,
  progress: { done: 0, total: null }
}

export default function pages (state = INITIAL_STATE, action) {
  switch (action.type) {
  case FETCH_PAGES_START:
    return {
      ...state,
      isRefreshing: true,
      progress: {
        done: 0,
        total: action.total
      }
    }

  case FETCH_PAGES_END:
    return {
      ...state,
      isRefreshing: false,
      list: action.pages
    }

  case FETCH_PAGES_PROGRESS:
    return {
      ...state,
      progress: {
        ...state.progress,
        done: ++state.progress.done
      }
    }

  case INIT_PAGES:
    return {
      ...state,
      isRefreshing: false,
      list: action.pages
    }

  default:
    return state
  }
}
