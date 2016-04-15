define(['react', 'react-redux', 'jsx!./ViewSelect', 'jsx!./Login', 'jsx!./PagesListTable'],
  (React, ReactRedux, ViewSelect, Login, PagesListTable) => {
    'use strict';

    const PagesList = ({pages, handleRefreshPages, isRefreshingPages}) => {
      return (
        <div>
          <div className='uk-margin-top'>
            <ViewSelect currentPage='Pages List' className='uk-display-inline-block' />
            <button className='uk-button uk-button-success uk-margin-left'
                    onClick={handleRefreshPages}
                    disabled={isRefreshingPages}>
              Refresh Pages
            </button>
            <Login className='uk-float-right' />
          </div>
          <PagesListTable pages={pages} />
        </div>
      );
    };

    const mapStateToProps = state => {
      return {
        pages: state.allPages,
        isRefreshingPages: state.isRefreshingPages
      };
    };

    const mapDispatchToProps = dispatch => {
      return {
        handleRefreshPages: () => dispatch({type: 'refreshPages'})
      };
    };

    return ReactRedux.connect(mapStateToProps, mapDispatchToProps)(PagesList);
  }
);