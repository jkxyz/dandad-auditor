define(['react', 'react-redux'], (React, ReactRedux) => {

  const Login = ({ isLoggedIn, username, onLoginSubmit }) => {
    if (isLoggedIn) {
      return <span className='uk-float-right'>Logged in as {username}</span>
    }

    return <div className='uk-button-dropdown uk-float-right' data-uk-dropdown='{pos:"bottom-right"}'>
      <button className='uk-button uk-button-primary'>Login</button>
      <div className='uk-dropdown'>
        <form className='uk-form' onSubmit={onLoginSubmit}>
          <input name='username' type='text' placeholder='Username' className='uk-margin-small-bottom' />
          <input name='password' type='password' placeholder='Password' />
          <input type='submit' className='uk-hidden' />
        </form>
      </div>
    </div>
  }

  const mapStateToProps = state => {
    return state.login
  }

  const mapDispatchToProps = dispatch => {
    return {
      onLoginSubmit: e => {
        const username = e.target.children.username.value
        const password = e.target.children.password.value

        e.preventDefault()

        const loginReq = $.ajax('/api/login', { data: { username, password }, method: 'POST' })

        loginReq.success(() => {
          dispatch({ type: 'userLogin', username: username })
        })

        loginReq.error(() => {
          alert('There was an error logging in')
        })
      }
    }
  }

  return ReactRedux.connect(mapStateToProps, mapDispatchToProps)(Login)

})
