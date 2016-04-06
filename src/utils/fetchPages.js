define([], function () {
  'use strict';

  return function fetchPages () {
    const pagesBaseUrl = 'http://www.dandad.org/manage/pages/basepage/?p=';
    const domParser = new DOMParser();

    const fetchPage = page => fetch('/api/get?url=' + pagesBaseUrl + page).then(res => res.text());

    return fetchPage(0).then(body => {
      let doc = domParser.parseFromString(body, 'text/html');
      let lastPage = Number(doc.querySelector('.pagination a.end').innerHTML - 1);
      let fetchingPages = [];

      for (let i = 0; i <= lastPage; i++) fetchingPages.push(fetchPage(i));

      return Promise.all(fetchingPages).then(allPages => {
        let pageDetails = [];

        allPages.forEach(page => {
          let doc = domParser.parseFromString(page, 'text/html');
          let rows = doc.querySelectorAll('#result_list tbody tr');

          [].forEach.call(rows, row => pageDetails.push({
            id:           Number(row.querySelector('th:nth-child(2) a').attributes.href.value.match(/\/([0-9]+)\/$/)[1])
          , title:        row.querySelector('th:nth-child(2) a').text
          , slug:         row.querySelector('td:nth-child(3)').innerHTML
          , contentType:  row.querySelector('td:nth-child(4)').innerHTML
          , isPublished:  row.querySelector('td:nth-child(5) input').checked
          , isRestricted: row.querySelector('td:nth-child(7) img').alt === 'True'
          }));
        });

        return pageDetails;
      });
    });
  };
});
