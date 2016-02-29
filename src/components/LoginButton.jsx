define(['react'], function (React) {

  var LoginButton = function (props) {

    if (props.loggedIn === false) {
      return <div className='uk-button-dropdown' data-uk-dropdown='{pos:"bottom-right"}'>
        <button className='uk-button uk-button-primary'>Login</button>
        <div className='uk-dropdown'>
          <form className='uk-form uk-text-right' onSubmit={props.onLoginFormSubmit}>
            <input name='username' type='text' placeholder='Username' className='uk-margin-small-bottom' />
            <input name='password' type='password' placeholder='Password' />
            <button type='submit'>Submit</button>
          </form>
        </div>
      </div>;
    }

    return <span>Logged in as {props.username}</span>;

  };

  return LoginButton;

});
