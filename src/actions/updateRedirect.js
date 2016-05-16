export const UPDATE_REDIRECT = 'UPDATE_REDIRECT'

export default (redirect, redirectTo) => (dispatch, getState) => {
  dispatch({
    type: UPDATE_REDIRECT,
    redirects: getState().redirects.list.map(r => {
      r.id === redirect.id ? { ...r, to: redirectTo } : r
    })
  })
}
