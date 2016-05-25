import slugToUrl from '../utils/slugToUrl'
import updateRedirect from './updateRedirect'

export const UNPUBLISH_PAGE_START = 'UNPUBLISH_PAGE_START'
export const UNPUBLISH_PAGE_END = 'UNPUBLISH_PAGE_END'

export let unpublishPageStart = () => {
  return { type: UNPUBLISH_PAGE_START }
}

export let unpublishPageEnd = (page) => {
  return { type: UNPUBLISH_PAGE_END, page }
}

export default (page, redirectTo = null) => (dispatch, getState) => {
  let sessionId = getState().session.sessionId

  dispatch(unpublishPageStart())

  if (redirectTo !== null) {
    let redirectsToPage = getState().redirects.list
      .filter(r => r.to ===  slugToUrl(page.slug) || r.to === `/en/${page.slug}/`)

    redirectsToPage.forEach(redirect => {
      let formData = new FormData()

      formData.append('site', 1)
      formData.append('old_path', redirect.from)
      formData.append('new_path', redirectTo)

      fetch(
        `/api/proxy?session_id=${sessionId}&url=`
        + `http://www.dandad.org/manage/deflect/redirect/${redirect.id}/`,
        { method: 'POST', body: formData }
      ).then(() => dispatch(updateRedirect(redirect, redirectTo)))
    })

    let formData = new FormData()

    formData.append('site', 1)
    formData.append('old_path', `/en/${page.slug}/`)
    formData.append('new_path', redirectTo)

    fetch(`/api/proxy?session_id=${sessionId}&url=http://www.dandad.org/manage/deflect/redirect/add/`, {
      method: 'POST', body: formData
    })
  }

  fetch(`/api/proxy?session_id=${sessionId}&url=http://www.dandad.org/manage/pages/basepage/unpublish/${page.id}/`)
    .then(() => dispatch(unpublishPageEnd(page)))
}
