import {
  FETCH_PAGES_START,
  FETCH_PAGES_END,
  FETCH_PAGES_PROGRESS
} from '../actions/fetchPages'
import { INIT_PAGES } from '../actions/init'
import {
  UNPUBLISH_PAGE_START,
  UNPUBLISH_PAGE_END
} from '../actions/unpublishPage'

const INITIAL_STATE = {
  list: [],
  isRefreshing: true,
  progress: { done: 0, total: null },
  isUnpublishing: false
}

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case FETCH_PAGES_START:
    return {
      ...state,
      isRefreshing: true,
      progress: { done: 0, total: action.total }
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
        done: state.progress.done + 1
      }
    }

  case UNPUBLISH_PAGE_START:
    return {
      ...state,
      isUnpublishing: true
    }

  case UNPUBLISH_PAGE_END:
    return {
      ...state,
      isUnpublishing: false,
      list: state.list.map(p => p.id === action.page.id ? { ...p, isPublished: false } : p)
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
