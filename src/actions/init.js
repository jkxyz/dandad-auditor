import { loginStart, loginEnd } from './login'
import { fetchPagesStart, fetchPagesEnd, LOCAL_STORAGE_PAGES } from './fetchPages'
import {
  fetchWebToLeadsStart,
  fetchWebToLeadsEnd,
  LOCAL_STORAGE_WEB_TO_LEADS
} from './fetchWebToLeads'

export default function init () {
  return dispatch => {
    dispatch(loginStart())
    dispatch(fetchPagesStart())
    dispatch(fetchWebToLeadsStart())

    fetch('/api/username').then(
      response => response.status === 200 ? response.text() : null
    ).then(
      username => dispatch(loginEnd(username))
    )

    dispatch(fetchWebToLeadsEnd(JSON.parse(window.localStorage.getItem(LOCAL_STORAGE_WEB_TO_LEADS) || '[]')))
    dispatch(fetchPagesEnd(JSON.parse(window.localStorage.getItem(LOCAL_STORAGE_PAGES) || '[]')))
  }
}
