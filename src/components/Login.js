define(['react', 'react-redux', 'jsx!./LoginControl'], (React, ReactRedux, LoginControl) => {
  'use strict';

  const Login = ({username, handleLogin, className}) => {
    return <LoginControl username={username} onSubmit={handleLogin} className={className} />;
  };

  const mapStateToProps = state => {
    return {
      username: state.username
    };
  };

  const mapDispatchToProps = dispatch => {
    return {
      handleLogin(event) {
        event.preventDefault();

        dispatch({
          type: 'login',
          username: event.target.children.username.value,
          password: event.target.children.password.value
        });
      }
    };
  };

  return ReactRedux.connect(mapStateToProps, mapDispatchToProps)(Login);
});