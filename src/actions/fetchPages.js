export const FETCH_PAGES_START = 'FETCH_PAGES_START';
export const FETCH_PAGES_END = 'FETCH_PAGES_END';

export const LOCAL_STORAGE_PAGES = 'dandadAuditorPages';

export function fetchPagesStart () {
  return {
    type: FETCH_PAGES_START
  }
}

export function fetchPagesEnd (pages) {
  return {
    type: FETCH_PAGES_END,
    pages
  }
}

export default function fetchPages () {
  return dispatch => {
    dispatch(fetchPagesStart());

    let domParser = new DOMParser();

    let fetchPage = page => fetch('/api/get?url=http://www.dandad.org/manage/pages/basepage/?p=' + page).then(res => res.text()).then(
      body => domParser.parseFromString(body, 'text/html')
    );

    fetchPage(0).then(firstPage => {
      let lastPage = Number(firstPage.querySelector('.pagination a.end').innerHTML - 1);
      let fetching = [];

      // Fetch every page of the pages list into an array of Promise results
      for (let i = 0; i <= lastPage; i++) {
        fetching.push(fetchPage(i));
      }

      Promise.all(fetching).then(allPages => {
        let pageDetails = [];

        // Select and process data from the HTML table on each page into an array of objects which represent the pages
        allPages.forEach(page => {
          let rows = page.querySelectorAll('#result_list tbody tr');

          [].forEach.call(rows, row => pageDetails.push({
            id:           Number(row.querySelector('th:nth-child(2) a').attributes.href.value.match(/\/([0-9]+)\/$/)[1]),
            title:        row.querySelector('th:nth-child(2) a').text,
            slug:         row.querySelector('td:nth-child(3)').innerHTML,
            contentType:  row.querySelector('td:nth-child(4)').innerHTML,
            isPublished:  row.querySelector('td:nth-child(5) input').checked,
            isRestricted: row.querySelector('td:nth-child(7) img').alt === 'True'
          }));
        });

        // Persist and update the running app state separately -- reducer shouldn't know about persistence
        window.localStorage.setItem(LOCAL_STORAGE_PAGES, JSON.stringify(pageDetails));
        dispatch(fetchPagesEnd(pageDetails));
      });
    })
  }
}