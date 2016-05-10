import React from 'react'
import { connect } from 'react-redux'
import login from '../actions/login'

let mapStateToProps = state => {
  return {
    isLoggedIn: state.session.isLoggedIn,
    isLoggingIn: state.session.isLoggingIn,
    username: state.session.username
  }
}

let mapDispatchToProps = dispatch => {
  return {
    handleLogin (e) {
      e.preventDefault()

      dispatch(login(
        e.target.children.username.value,
        e.target.children.password.value
      ))
    }
  }
}

let Username = ({ className, username }) =>
  <span className={ className }>Logged in as { username }</span>

let LoginDropdown = ({ onSubmit, disabled }) =>
  disabled ? null :
    <div className='uk-dropdown uk-dropdown-bottom'>
      <form onSubmit={ onSubmit }>
        <input
          className='uk-width-1-1'
          type='text'
          placeholder='Username'
          name='username'
        />
        <input
          className='uk-width-1-1 uk-margin-small-top'
          type='password'
          placeholder='Password'
          name='password'
        />
        <input className='uk-hidden' type='submit' />
      </form>
    </div>

let LoginButton = ({ className, disabled, onSubmit }) =>
  <div className={ className + ' uk-button-dropdown' } data-uk-dropdown>
    <button className='uk-button uk-button-primary' disabled={ disabled }>
      Login
    </button>
    <LoginDropdown onSubmit={ onSubmit } disabled={ disabled } />
  </div>

export default connect(mapStateToProps, mapDispatchToProps)(
  ({ className, isLoggedIn, isLoggingIn, username, handleLogin }) =>
    isLoggedIn
      ? <Username className={ className } username={ username } />
      : <LoginButton
          className={ className }
          disabled={ isLoggingIn }
          onSubmit={ handleLogin }
        />
)
