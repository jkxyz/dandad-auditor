define(['react', 'react-redux', 'jsx!./ViewSelect', 'jsx!./Login', 'jsx!./PagesListTable'], (React, ReactRedux, ViewSelect, Login, PagesListTable) => {
  'use strict';

  const PagesList = ({pages, username, handleLogin}) => {
    return (
      <div>
        <div className="uk-margin-top">
          <ViewSelect currentPage="Pages List" className="uk-display-inline-block" />
          <Login className="uk-float-right" />
        </div>
        <PagesListTable pages={pages} />
      </div>
    );
  };

  const mapStateToProps = state => {
    return {
      pages: state.allPages
    };
  };

  const mapDispatchToProps = dispatch => {
    return {};
  };

  return ReactRedux.connect(mapStateToProps, mapDispatchToProps)(PagesList);
});