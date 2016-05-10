import _fetchAndParse from '../utils/fetchAndParse'
import slugToUrl from '../utils/slugToUrl'

export const FETCH_WEB_TO_LEADS_START = 'FETCH_WEB_TO_LEADS_START'
export const FETCH_WEB_TO_LEADS_END = 'FETCH_WEB_TO_LEADS_END'
export const FETCH_WEB_TO_LEADS_PROGRESS = 'FETCH_WEB_TO_LEADS_PROGRESS'

export const LOCAL_STORAGE_WEB_TO_LEADS = 'dandadAuditorWebToLeads'

export let fetchWebToLeadsStart = (total = null) => {
  return { type: FETCH_WEB_TO_LEADS_START, total }
}

export let fetchWebToLeadsEnd = webToLeads => {
  return { type: FETCH_WEB_TO_LEADS_END, webToLeads }
}

export let fetchWebToLeadsProgress = () => {
  return { type: FETCH_WEB_TO_LEADS_PROGRESS }
}

let pageHasWebToLead = page => page && page.querySelector('.web-to-lead') !== null

export default () => (dispatch, getState) => {
  let pageUrls =
    getState().pages.list
      .filter(p => p.isPublished && !p.isRestricted)
      .map(page => slugToUrl(page.slug))

  dispatch(fetchWebToLeadsStart(pageUrls.length))

  let domParser = new DOMParser()
  let fetchAndParse = _fetchAndParse.bind(undefined, domParser)

  Promise.all(
    pageUrls.map(p => fetchAndParse(p, () => dispatch(fetchWebToLeadsProgress())))
  ).then(pages => {
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
