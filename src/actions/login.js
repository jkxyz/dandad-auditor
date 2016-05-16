export const LOGIN_START = 'LOGIN_START';
export const LOGIN_END = 'LOGIN_END';

export let loginStart = () => {
  return { type: LOGIN_START }
}

export let loginEnd = (success, username = null, sessionId = null) => {
  return { type: LOGIN_END, success, username, sessionId }
}

export default (username, password) => dispatch => {
  dispatch(loginStart())

  let formData = new FormData()

  formData.append('username', username)
  formData.append('password', password)

  fetch('/api/sessions', { body: formData, method: 'POST' })
    .then(r => r.ok ? r.json() : null)
    .then(response => {
      if (response.success) {
        dispatch(loginEnd(true, response.username, response.sessionId))
      } else {
        dispatch(loginEnd(false))
      }
    })
}
