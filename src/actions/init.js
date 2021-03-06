import { LOCAL_STORAGE_PAGES } from './fetchPages'
import { LOCAL_STORAGE_WEB_TO_LEADS } from './fetchWebToLeads'
import { LOCAL_STORAGE_REDIRECTS } from './fetchRedirects'

export const INIT_PAGES = 'INIT_PAGES'
export const INIT_WEB_TO_LEADS = 'INIT_WEB_TO_LEADS'
export const INIT_REDIRECTS = 'INIT_REDIRECTS'

export let initPages = pages => {
  return { type: INIT_PAGES, pages }
}

export let initWebToLeads = webToLeads => {
  return { type: INIT_WEB_TO_LEADS, webToLeads }
}

export let initRedirects = redirects => {
  return { type: INIT_REDIRECTS, redirects }
}

export default () => dispatch => {
  dispatch(initPages(
    JSON.parse(window.localStorage.getItem(LOCAL_STORAGE_PAGES) || '[]')
  ))

  dispatch(initWebToLeads(
    JSON.parse(window.localStorage.getItem(LOCAL_STORAGE_WEB_TO_LEADS) || '[]')
  ))

  dispatch(initRedirects(
    JSON.parse(window.localStorage.getItem(LOCAL_STORAGE_REDIRECTS) || '[]')
  ))
}
