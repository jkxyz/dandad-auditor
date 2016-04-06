define(['react', 'jsx!./ViewSelectOption'], (React, ViewSelectOption) => {
  'use strict';

  return ({currentPage, className}) => {
    return (
      <div className={className}>
        <div className="uk-button-dropdown" data-uk-dropdown>
          <button className="uk-button">
            {currentPage} <i className="uk-icon-caret-down"/>
          </button>
          <div className="uk-dropdown uk-dropdown-bottom">
            <ul className="uk-nav uk-nav-dropdown">
              <ViewSelectOption path="/">Pages List</ViewSelectOption>
              <ViewSelectOption path="/search">Search</ViewSelectOption>
            </ul>
          </div>
        </div>
      </div>
    );
  };
});