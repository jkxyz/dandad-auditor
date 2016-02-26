define(['react'], function (React) {
  var App = React.createClass({
    render: function () {
      return <div className='wrapper'>
        <form onSubmit={this.onFormSubmit}>
          <input type='text' ref='usernameInput' placeholder='Username' />
          <input type='password' ref='passwordInput' placeholder='Password' />
          <button type='submit'>Login</button>
        </form>
      </div>;
    },
    onFormSubmit: function (e) {
      var username = this.refs.usernameInput.value;
      var password = this.refs.passwordInput.value;

      console.log(username, password);

      e.preventDefault();
    }
  });

  return App;
});
