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

        const username = event.target.children.username.value;

        fetch('/api/login', {method: 'POST', body: new FormData(event.target)}).then(
          res => (res.status === 200 && dispatch({type: 'login', username})) || alert('There was an error logging in')
        );
      }
    };
  };

  return ReactRedux.connect(mapStateToProps, mapDispatchToProps)(Login);
});