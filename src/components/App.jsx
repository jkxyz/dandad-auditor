define(['react', 'react-redux', 'jsx!LoginButton'], function (React, ReactRedux, LoginButton) {

  var App = function (props) {
    return <div className='uk-container uk-container-center'>
      <div className='uk-margin-top uk-margin-bottom uk-text-right'>
        <LoginButton isLoggedIn={props.isLoggedIn} username={props.loggedInUsername} onSubmit={props.onLoginFormSubmit} />
      </div>
    </div>;
  };

  var mapStateToProps = function (state) {
    return {};
  };

  var mapDispatchToProps = function (dispatch) {
    return {
      /**
       * Submit a request to the local login endpoint to authorize all future requests
       * to the CMS. Update the logged in state of the application if successful.
       */
      onLoginFormSubmit: function (e) {
        var username = e.target.children.username.value;
        var password = e.target.children.password.value;
        var req      = $.ajax('/api/login', { method: 'POST', data: { username: username, password: password } });

        req.success(function () {
          dispatch({ type: 'USER_LOGGED_IN', username: username });
        });

        req.error(function () {
          alert('Error loggin in. Try again.');
        });

        e.preventDefault();
      }
    };
  };

  var AppWrapper = ReactRedux.connect(mapStateToProps, mapDispatchToProps)(App);

  return AppWrapper;

});
