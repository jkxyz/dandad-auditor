define(['react', 'react-redux'], (React, ReactRedux) => {
  'use strict';

  const PageSelector = ({ viewName }) => {
    return (
      <div className='uk-button-dropdown uk-margin-right' data-uk-dropdown>
        <button className='uk-button'>
          {viewName} <i className='uk-icon-caret-down' />
        </button>
        <div className='uk-dropdown uk-dropdown-bottom'>
          <ul className='uk-nav uk-nav-dropdown'>
            <li>
              <a>Page Search</a>
            </li>
          </ul>
        </div>
      </div>
    )
  };

  const viewNames = {
    'Pages': 'All Pages'
  };

  const mapStateToProps = state => {
    return {
      viewName: viewNames[state.currentView]
    }
  };

  const mapDispatchToProps = dispatch => {
    return {}
  };

  return ReactRedux.connect(mapStateToProps, mapDispatchToProps)(PageSelector)
});