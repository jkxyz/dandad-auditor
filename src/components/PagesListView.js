define(
  ['react', 'react-redux', '../actions', 'jsx!./LoginButton', 'jsx!./ViewSelector'],
  (React, ReactRedux, {fetchPages}, LoginButton, ViewSelector) => {
    'use strict';

    const PagesListView = ({isLoggedIn, isRefreshingPages, handleRefreshPages, pages}) => {
      return (
        <div className='uk-container uk-container-center'>
          <div className='uk-margin-top'>
            <ViewSelector current='Pages' />
            <button
              className='uk-button uk-button-primary uk-margin-left'
              disabled={!isLoggedIn || isRefreshingPages}
              onClick={handleRefreshPages}>
              {isRefreshingPages ? <i className='uk-icon-refresh uk-icon-spin uk-margin-right' /> : null}
              Refresh Pages
            </button>
            <LoginButton className='uk-float-right' />
          </div>
          <table className='uk-table'>
            <thead>
              <tr>
                <th>ID</th>
                <th>Title</th>
                <th>Slug</th>
                <th>Type</th>
                <th>Published?</th>
                <th>Restricted?</th>
              </tr>
            </thead>
            <tbody>
              {pages.map(page => (
                <tr key={page.id}>
                  <td>{page.id}</td>
                  <td>{page.title}</td>
                  <td>{page.slug}</td>
                  <td>{page.contentType}</td>
                  <td>{page.isPublished ? 'Yes' : 'No'}</td>
                  <td>{page.isRestricted ? 'Yes' : 'No'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    };

    const mapStateToProps = state => {
      return {
        isLoggedIn: state.session.isLoggedIn,
        isRefreshingPages: state.pages.isRefreshingPages,
        pages: state.pages.pagesList
      };
    };

    const mapDispatchToProps = dispatch => {
      return {
        handleRefreshPages() {
          dispatch(fetchPages());
        }
      };
    };

    return ReactRedux.connect(mapStateToProps, mapDispatchToProps)(PagesListView);
  }
);