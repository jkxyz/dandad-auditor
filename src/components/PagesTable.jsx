define(['react', 'react-redux'], (React, ReactRedux) => {

  const PagesTable = ({ pages }) => {

    const rows = pages.map(page => {

      return <tr key={page.id}>
        <td>{page.id}</td>
        <td>{page.title}</td>
        <td>{page.slug}</td>
        <td>{page.contentType}</td>
        <td>{page.isPublished ? 'Yes' : 'No'}</td>
        <td>{page.isRestricted ? 'Yes' : 'No'}</td>
      </tr>

    })

    return <table className='uk-table uk-table-hover'>
      <thead>
        <tr>
          <th>ID</th>
          <th>Title</th>
          <th>Slug</th>
          <th>Content Type</th>
          <th>Published?</th>
          <th>Restricted?</th>
        </tr>
      </thead>
      <tbody>
        {rows}
      </tbody>
    </table>

  }

  const mapStateToProps = state => {

    return {

      pages: state.pages

    }

  }

  const mapDispatchToProps = dispatch => {

    return {}

  }

  return ReactRedux.connect(mapStateToProps, mapDispatchToProps)(PagesTable)

})
