define(['react', 'react-redux'], (React, ReactRedux) => {

  'use strict'

  const ToggleIcon = ({ column, sortColumn, sortDirection }) => {

    if (column === sortColumn) {

      return (
        <div
          style={{ marginTop: '3px' }}
          className={'uk-margin-left ' + (sortDirection === 'ASC' ? 'uk-icon-toggle-up' : 'uk-icon-toggle-down')}>
        </div>
      )

    }

    return <div></div>

  }

  const PagesTable = ({ pages, sortColumn, sortDirection, makeOnColumnClick }) => {

    const rows = pages.map(page => {

      return (
        <tr key={page.id}>
          <td>{page.id}</td>
          <td>{page.title}</td>
          <td>{page.slug}</td>
          <td>{page.contentType}</td>
          <td>{page.isPublished ? 'Yes' : 'No'}</td>
          <td>{page.isRestricted ? 'Yes' : 'No'}</td>
        </tr>
      )

    })

    return (
      <table className='uk-table uk-table-hover'>
        <thead>
          <tr>
            <th onClick={makeOnColumnClick('id')}>
              <div className='uk-flex uk-flex-space-between'>
                <div>ID</div>
                <ToggleIcon column='id' sortColumn={sortColumn} sortDirection={sortDirection} />
              </div>
            </th>
            <th onClick={makeOnColumnClick('title')}>
              <div className='uk-flex uk-flex-space-between'>
                <div>Title</div>
                <ToggleIcon column='title' sortColumn={sortColumn} sortDirection={sortDirection} />
              </div>
            </th>
            <th onClick={makeOnColumnClick('slug')}>
              <div className='uk-flex uk-flex-space-between'>
                <div>Slug</div>
                <ToggleIcon column='slug' sortColumn={sortColumn} sortDirection={sortDirection} />
              </div>
            </th>
            <th onClick={makeOnColumnClick('contentType')}>
              <div className='uk-flex uk-flex-space-between'>
                <div>Content Type</div>
                <ToggleIcon column='contentType' sortColumn={sortColumn} sortDirection={sortDirection} />
              </div>
            </th>
            <th onClick={makeOnColumnClick('isPublished')}>
              <div className='uk-flex uk-flex-space-between'>
                <div>Published?</div>
                <ToggleIcon column='isPublished' sortColumn={sortColumn} sortDirection={sortDirection} />
              </div>
            </th>
            <th onClick={makeOnColumnClick('isRestricted')}>
              <div className='uk-flex uk-flex-space-between'>
                <div>Restricted?</div>
                <ToggleIcon column='isRestricted' sortColumn={sortColumn} sortDirection={sortDirection} />
              </div>
            </th>
          </tr>
        </thead>
        <tbody>
          {rows}
        </tbody>
      </table>
    )

  }

  const mapStateToProps = state => {

    let pages = state.pages

    pages.sort((a, b) => {

      if (a[state.sortColumn] < b[state.sortColumn]) return state.sortDirection === 'ASC' ? -1 : 1

      if (a[state.sortColumn] > b[state.sortColumn]) return state.sortDirection === 'ASC' ? 1 : -1

      return 0

    })

    return { 

      pages
    , sortColumn: state.sortColumn
    , sortDirection: state.sortDirection

    }

  }

  const mapDispatchToProps = dispatch => {

    return {

      makeOnColumnClick: column => {

        // Return a handler that will toggle the sort column
        return () => dispatch({ type: 'toggleSortColumn', column })

      }
    
    }

  }

  return ReactRedux.connect(mapStateToProps, mapDispatchToProps)(PagesTable)

})
