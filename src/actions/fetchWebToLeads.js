import fetchAndParse from '../utils/fetchAndParse'
import slugToUrl from '../utils/slugToUrl'

export const FETCH_WEB_TO_LEADS_START = 'FETCH_WEB_TO_LEADS_START'
export const FETCH_WEB_TO_LEADS_END = 'FETCH_WEB_TO_LEADS_END'
export const FETCH_WEB_TO_LEADS_PROGRESS = 'FETCH_WEB_TO_LEADS_PROGRESS'

export const LOCAL_STORAGE_WEB_TO_LEADS = 'dandadAuditorWebToLeads'

export function fetchWebToLeadsStart (total = null) {
  return { type: FETCH_WEB_TO_LEADS_START, total }
}

export function fetchWebToLeadsEnd (webToLeads) {
  return { type: FETCH_WEB_TO_LEADS_END, webToLeads }
}

export function fetchWebToLeadsProgress () {
  return { type: FETCH_WEB_TO_LEADS_PROGRESS }
}

function pageHasWebToLead (page) {
  return page && page.querySelector('.web-to-lead') !== null
}

export default function fetchWebToLeads () {
  return (dispatch, getState) => {
    let pageUrls =
      getState().pages.list
        .filter(p => p.isPublished && !p.isRestricted)
        .map(page => slugToUrl(page.slug))

    dispatch(fetchWebToLeadsStart(pageUrls.length))

    let domParser = new DOMParser()
    let progress = () => dispatch(fetchWebToLeadsProgress())
    let fetchPage = page => fetchAndParse(domParser, page, progress)

    Promise.all(pageUrls.map(fetchPage)).then(pages => {
      let webToLeads = pages.filter(pageHasWebToLead).map(page => {
        let webToLead = page.querySelector('.web-to-lead')
        let form = webToLead.querySelector('form')

        return {
          id: webToLead.id.match(/^web-to-lead-([0-9]+)/)[1],
          title: webToLead.querySelector('h2').innerText,
          trackingCode: form.dataset.trackingcode,
          salesforceListId: form.children['id_salesforce_list_id'].value,
          subject: form.children['id_subject'].value,
          pageSlug: new URL(page.url).pathname.match(/^\/en\/(.*)\//)[1]
        }
      })

      window.localStorage.setItem(LOCAL_STORAGE_WEB_TO_LEADS, JSON.stringify(webToLeads))
      dispatch(fetchWebToLeadsEnd(webToLeads))
    })
  }
}
