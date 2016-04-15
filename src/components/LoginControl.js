define(['react'], (React) => {
  'use strict';

  return ({username, className, onSubmit}) => {
    if (username !== null) {
      return <span className={className}>Logged in as {username}</span>;
    }

    return (
      <div className={'uk-button-dropdown ' + className} data-uk-dropdown>
        <button className='uk-button uk-button-primary'>
          Login
        </button>
        <div className='uk-dropdown uk-dropdown-bottom'>
          <form onSubmit={onSubmit}>
            <input className='uk-width-1-1' type='text' placeholder='Username' name='username' />
            <input className='uk-margin-small-top uk-width-1-1' type='password' placeholder='Password' name='password' />
            <input type='submit' className='uk-hidden' />
          </form>
        </div>
      </div>
    );
  };
});