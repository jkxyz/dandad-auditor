import { FETCH_PAGES_START, FETCH_PAGES_END } from '../actions/fetchPages'

const INITIAL_STATE = {
  isRefreshingPages: false,
  pagesList: []
};

export default function pages (state = INITIAL_STATE, action) {
  switch (action.type) {
  case FETCH_PAGES_START:
    return { ...state, isRefreshingPages: true };

  case FETCH_PAGES_END:
    return { ...state, isRefreshingPages: false, pagesList: action.pages };

  default:
    return state;
  }
}