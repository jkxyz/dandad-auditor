import _fetchAndParse from '../utils/fetchAndParse'

export const FETCH_PAGES_START = 'FETCH_PAGES_START'
export const FETCH_PAGES_END = 'FETCH_PAGES_END'
export const FETCH_PAGES_PROGRESS = 'FETCH_PAGES_PROGRESS'

export const LOCAL_STORAGE_PAGES = 'dandadAuditorPages'

export let fetchPagesStart = (total = null) => {
  return { type: FETCH_PAGES_START, total }
}

export let fetchPagesEnd = pages => {
  return { type: FETCH_PAGES_END, pages }
}

export let fetchPagesProgress = () => {
  return { type: FETCH_PAGES_PROGRESS }
}

export default () => (dispatch, getState) => {
  let fetchAndParse = _fetchAndParse.bind(undefined, new DOMParser(), getState().session.sessionId)

  dispatch(fetchPagesStart())

  fetchAndParse('http://www.dandad.org/manage/pages/basepage/').then(({ doc: firstCMSPage }) => {
    let lastCMSPage = Number(firstCMSPage.querySelector('.pagination a.end').innerHTML) - 1
    let fetching = []

    dispatch(fetchPagesStart(lastCMSPage))

    for (let i = 0; i <= lastCMSPage; i++) {
      fetching.push(
        fetchAndParse(
          `http://www.dandad.org/manage/pages/basepage/?p=${i}`,
          () => dispatch(fetchPagesProgress())
        )
      )
    }

    Promise.all(fetching).then(allCMSPages => {
      let pages = []

      allCMSPages.forEach(({ doc: cmsPage }) => {
        let rows = cmsPage.querySelectorAll('#result_list tbody tr')

        ;[].forEach.call(rows, row => pages.push({
          id: Number(row.querySelector('th:nth-child(2) a').attributes.href.value.match(/\/([0-9]+)\/$/)[1]),
          title: row.querySelector('th:nth-child(2) a').text,
          slug: row.querySelector('td:nth-child(3)').innerHTML,
          contentType: row.querySelector('td:nth-child(4)').innerHTML,
          isPublished: row.querySelector('td:nth-child(5) input').checked,
          isRestricted: row.querySelector('td:nth-child(7) img').alt === 'True'
        }))
      })

      window.localStorage.setItem(LOCAL_STORAGE_PAGES, JSON.stringify(pages))
      dispatch(fetchPagesEnd(pages))
    })
  })
}
