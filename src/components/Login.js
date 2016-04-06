define(['react'], (React) => {
  'use strict';

  return ({username, className}) => {
    if (username !== null) {
      return <span>Logged in as {username}</span>;
    }

    return (
      <div className={"uk-button-dropdown " + className} data-uk-dropdown>
        <button className="uk-button uk-button-primary">
          Login
        </button>
        <div className="uk-dropdown uk-dropdown-bottom">
          <input type="text" placeholder="Username" />
          <input type="password" placeholder="Password" />
        </div>
      </div>
    );
  };
});