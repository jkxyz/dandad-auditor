import React from 'react'
import {connect} from 'react-redux'
import {login} from '../actions'

let LoginButton = ({className, handleLogin, isLoggedIn, isLoggingIn, username}) => {
  if (isLoggedIn) {
    return <span className={className}>Logged in as {username}</span>
  }

  let dropdown = (
    <div className='uk-dropdown uk-dropdown-bottom'>
      <form onSubmit={handleLogin}>
        <input className='uk-width-1-1' type='text' placeholder='Username' name='username' />
        <input className='uk-width-1-1 uk-margin-small-top' type='password' placeholder='Password' name='password' />
        <input type='submit' className='uk-hidden' />
      </form>
    </div>
  );

  return (
    <div className={'uk-button-dropdown ' + className} data-uk-dropdown>
      <button className='uk-button uk-button-primary' disabled={isLoggingIn}>
        Login
      </button>
      {isLoggingIn ? null : dropdown}
    </div>
  )
};

let mapStateToProps = state => {
  return state.session
};

let mapDispatchToProps = dispatch => {
  return {
    handleLogin(e) {
      e.preventDefault();
      dispatch(login(e.target.children.username.value, e.target.children.password.value))
    }
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginButton)