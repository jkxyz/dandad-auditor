define(['react'], (React) => {
  'use strict';

  return ({pages}) => {
    return (
      <table className="uk-table">
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
    );
  };
});