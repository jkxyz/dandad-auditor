define(
  ['react', 'react-router'],
  (React, {Link}) => {
    'use strict';

    return ({current}) => {
      return (
        <div className='uk-button-dropdown' data-uk-dropdown>
          <button className='uk-button'>
            {current}
            <i className='uk-icon-caret-down uk-margin-small-left' />
          </button>
          <div className='uk-dropdown uk-dropdown-bottom'>
            <ul className='uk-nav uk-nav-dropdown'>
              <li><Link to='/'>Pages</Link></li>
            </ul>
          </div>
        </div>
      );
    };
  }
);