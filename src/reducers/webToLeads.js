import {
  FETCH_WEB_TO_LEADS_START,
  FETCH_WEB_TO_LEADS_END
} from '../actions/fetchWebToLeads'

const INITIAL_STATE = {
  list: [],
  isRefreshing: false
}

export default function webToLeads (state = INITIAL_STATE, action) {
  switch (action.type) {
  case FETCH_WEB_TO_LEADS_START:
    return { ...state, isRefreshing: true }

  case FETCH_WEB_TO_LEADS_END:
    return {
      ...state,
      isRefreshing: false,
      list: action.webToLeads
    }

  default:
    return state
  }
}
