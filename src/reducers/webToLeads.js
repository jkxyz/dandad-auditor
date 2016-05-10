import {
  FETCH_WEB_TO_LEADS_START,
  FETCH_WEB_TO_LEADS_END,
  FETCH_WEB_TO_LEADS_PROGRESS
} from '../actions/fetchWebToLeads'
import { INIT_WEB_TO_LEADS } from '../actions/init'

const INITIAL_STATE = {
  list: [],
  isRefreshing: true,
  progress: { done: 0, total: 0 }
}

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case FETCH_WEB_TO_LEADS_START:
    return {
      ...state,
      isRefreshing: true,
      progress: { done: 0, total: action.total }
    }

  case FETCH_WEB_TO_LEADS_END:
    return {
      ...state,
      isRefreshing: false,
      list: action.webToLeads
    }

  case FETCH_WEB_TO_LEADS_PROGRESS:
    return {
      ...state,
      progress: {
        ...state.progress,
        done: state.progress.done + 1
      }
    }

  case INIT_WEB_TO_LEADS:
    return {
      ...state,
      isRefreshing: false,
      list: action.webToLeads
    }

  default:
    return state
  }
}
