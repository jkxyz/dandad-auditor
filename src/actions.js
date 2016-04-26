export const LOGIN_START = 'LOGIN_START';
export const LOGIN_END = 'LOGIN_END';

export function loginStart() {
  return {type: LOGIN_START}
}

export function loginEnd(username) {
  return {type: LOGIN_END, username}
}

/**
 * Dispatches to display that login has been submitted, and dispatches again with the updated login status and username.
 */
export function login(username, password) {
  return dispatch => {
    dispatch(loginStart());

    let formData = new FormData();

    formData.append('username', username);
    formData.append('password', password);

    fetch('/api/login', {method: 'POST', body: formData}).then(
      response => dispatch(loginEnd((response.status === 200 && username) || null))
    )
  }
}

export const FETCH_PAGES_START = 'FETCH_PAGES_START';
export const FETCH_PAGES_END = 'FETCH_PAGES_END';

const LOCAL_STORAGE_PAGES = 'dandadAuditorPages';

export function fetchPagesStart() {
  return {type: FETCH_PAGES_START}
}

export function fetchPagesEnd(pages) {
  return {type: FETCH_PAGES_END, pages}
}

/**
 * Dispatches to display that pages are being fetched, and dispatches again after fetching all page metadata from
 * the CMS pages list. Crawls the pages list to convert the HTML table into the stored JSON data structure.
 */
export function fetchPages() {
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

/**
 * Dispatches to initialise the running app state from persisted data: session username, pages in localStorage.
 */
export function init() {
  return dispatch => {
    dispatch(loginStart());
    dispatch(fetchPagesStart());

    fetch('/api/username').then(response => response.status === 200 && response.text()).then(
      username => dispatch(loginEnd(username || null))
    );

    dispatch(fetchPagesEnd(JSON.parse(window.localStorage.getItem(LOCAL_STORAGE_PAGES) || '[]')));
  }
}