import { loginStart, loginEnd } from './login'
import { fetchPagesStart, fetchPagesEnd, LOCAL_STORAGE_PAGES } from './fetchPages'

export default function init () {
  return dispatch => {
    dispatch(loginStart());
    dispatch(fetchPagesStart());

    fetch('/api/username').then(
      response => response.status === 200 ? response.text() : null
    ).then(
      username => dispatch(loginEnd(username))
    );

    dispatch(fetchPagesEnd(JSON.parse(window.localStorage.getItem(LOCAL_STORAGE_PAGES) || '[]')))
  }
}