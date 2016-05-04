export const LOGIN_START = 'LOGIN_START';
export const LOGIN_END = 'LOGIN_END';

export function loginStart () {
  return {
    type: LOGIN_START
  }
}

export function loginEnd (username) {
  return {
    type: LOGIN_END,
    username
  }
}

export default function login (username, password) {
  return dispatch => {
    dispatch(loginStart());

    let formData = new FormData();

    formData.append('username', username);
    formData.append('password', password);

    fetch('/api/login', { body: formData, method: 'POST' }).then(
      response => dispatch(loginEnd(response.status === 200 ? username : null))
    )
  }
}
