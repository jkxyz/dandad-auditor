import React from 'react'
import {connect} from 'react-redux'
import fetchPages from '../actions/fetchPages'
import LoginButton from './LoginButton'
import ViewSelector from './ViewSelector'

let PagesListView = ({isLoggedIn, isRefreshingPages, handleRefreshPages, pages, handleSortPages, sortDirection, sortColumn}) => {
  let Column = ({column, children}) => {
    return (
      <th onClick={() => handleSortPages(column)}>
        {children}
        {sortColumn === column
          ? <i className={'uk-margin-small-left ' + (sortDirection === 'ASC' ? 'uk-icon-caret-up' : 'uk-icon-caret-down')} />
          : null}
      </th>
    );
  };

  return (
    <div className='uk-container uk-container-center'>
      <div className='uk-margin-top'>
        <ViewSelector current='Pages' />
        <button
          className='uk-button uk-button-primary uk-margin-left'
          disabled={!isLoggedIn || isRefreshingPages}
          onClick={handleRefreshPages}>
          {isRefreshingPages ? <i className='uk-icon-refresh uk-icon-spin uk-margin-right' /> : null}
          Refresh
        </button>
        <LoginButton className='uk-float-right' />
      </div>
      <table className='uk-table'>
        <thead>
        <tr>
          <Column column='id'>ID</Column>
          <Column column='title'>Title</Column>
          <Column column='slug'>Slug</Column>
          <Column column='contentType'>Type</Column>
          <Column column='isPublished'>Published?</Column>
          <Column column='isRestricted'>Restricted?</Column>
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

let mapStateToProps = state => {
  return {
    isLoggedIn: state.session.isLoggedIn,
    isRefreshingPages: state.pages.isRefreshingPages,
    pages: state.pages.pagesList,
    sortColumn: state.pages.sortColumn,
    sortDirection: state.pages.sortDirection
  };
};

let mapDispatchToProps = dispatch => {
  return {
    handleRefreshPages() {
      dispatch(fetchPages());
    }
    // handleSortPages(column) {
    //   dispatch(sortPages(column));
    // }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PagesListView)