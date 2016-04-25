define(
  ['react', 'react-redux', '../actions'],
  (React, ReactRedux, {login}) => {
    'use strict';

    const LoginButton = ({className, handleLogin, isLoggedIn, isLoggingIn, username}) => {
      if (isLoggedIn) {
        return <span className={className}>Logged in as {username}</span>;
      }

      const dropdown = (
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
      );
    };

    const mapStateToProps = state => {
      return state.session;
    };

    const mapDispatchToProps = dispatch => {
      return {
        handleLogin(e) {
          e.preventDefault();
          dispatch(login(e.target.children.username.value, e.target.children.password.value));
        }
      };
    };

    return ReactRedux.connect(mapStateToProps, mapDispatchToProps)(LoginButton);
  }
);