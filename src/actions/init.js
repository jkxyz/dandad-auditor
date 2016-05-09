import { LOCAL_STORAGE_PAGES } from './fetchPages'
import { LOCAL_STORAGE_WEB_TO_LEADS } from './fetchWebToLeads'

export const INIT_LOGIN = 'INIT_LOGIN'
export const INIT_PAGES = 'INIT_PAGES'
export const INIT_WEB_TO_LEADS = 'INIT_WEB_TO_LEADS'

export function initLogin (username) {
  return { type: INIT_LOGIN, username }
}

export function initPages (pages) {
  return { type: INIT_PAGES, pages }
}

export function initWebToLeads (webToLeads) {
  return { type: INIT_WEB_TO_LEADS, webToLeads }
}

export default function init () {
  return dispatch => {
    fetch('/api/username').then(r => r.ok ? r.text() : null).then(
      username => dispatch(initLogin(username))
    )

    dispatch(initPages(
      JSON.parse(window.localStorage.getItem(LOCAL_STORAGE_PAGES) || '[]')
    ))

    dispatch(initWebToLeads(
      JSON.parse(window.localStorage.getItem(LOCAL_STORAGE_WEB_TO_LEADS) || '[]')
    ))
  }
}
