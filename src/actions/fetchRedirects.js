import _fetchAndParse from '../utils/fetchAndParse'

export const FETCH_REDIRECTS_START = 'FETCH_REDIRECTS_START'
export const FETCH_REDIRECTS_END = 'FETCH_REDIRECTS_END'
export const FETCH_REDIRECTS_PROGRESS = 'FETCH_REDIRECTS_PROGRESS'

export const LOCAL_STORAGE_REDIRECTS = 'dandadAuditorRedirects'

export let fetchRedirectsStart = (total = null) => {
  return { type: FETCH_REDIRECTS_START, total }
}

export let fetchRedirectsEnd = (redirects) => {
  return { type: FETCH_REDIRECTS_END, redirects }
}

export let fetchRedirectsProgress = () => {
  return { type: FETCH_REDIRECTS_PROGRESS }
}

export default () => (dispatch, getState) => {
  let fetchAndParse = _fetchAndParse.bind(undefined, new DOMParser(), getState().session.sessionId)

  dispatch(fetchRedirectsStart())

  fetchAndParse('http://www.dandad.org/manage/deflect/redirect/').then(({ doc: firstCMSPage }) => {
    let lastCMSPage = Number(firstCMSPage.querySelector('.pagination a.end').innerHTML) - 1
    let fetching = []

    dispatch(fetchRedirectsStart(lastCMSPage))

    for (let i = 0; i <= lastCMSPage; i++) {
      fetching.push(
        fetchAndParse(
          `http://www.dandad.org/manage/deflect/redirect/?p=${i}`,
          () => dispatch(fetchRedirectsProgress())
        )
      )
    }

    Promise.all(fetching).then(allCMSPages => {
      let redirects = []

      allCMSPages.forEach(({ doc: cmsPage }) => {
        let rows = cmsPage.querySelectorAll('#result_list tbody tr')

        ;[].forEach.call(rows, row => redirects.push({
          id: row.querySelector('th:nth-child(2) a').attributes.href.value.match(/\/([0-9]+)\/$/)[1],
          from: row.querySelector('th:nth-child(2) a').innerHTML,
          to: row.querySelector('td:last-child').innerHTML
        }))
      })

      window.localStorage.setItem(LOCAL_STORAGE_REDIRECTS, JSON.stringify(redirects))
      dispatch(fetchRedirectsEnd(redirects))
    })
  })
}
