import {
  FETCH_WEB_TO_LEADS_START,
  FETCH_WEB_TO_LEADS_END,
  FETCH_WEB_TO_LEADS_PROGRESS
} from '../actions/fetchWebToLeads'

const INITIAL_STATE = {
  list: [],
  isRefreshing: false,
  progress: { done: 0, total: 0 }
}

export default function webToLeads (state = INITIAL_STATE, action) {
  switch (action.type) {
  case FETCH_WEB_TO_LEADS_START:
    return {
      ...state,
      isRefreshing: true,
      progress: {
        done: 0,
        total: action.total
      }
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
        done: ++state.progress.done
      }
    }

  default:
    return state
  }
}
