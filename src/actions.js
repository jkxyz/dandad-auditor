define(
  [],
  () => {
    'use strict';

    function login(username, password) {
      return function (dispatch) {
        dispatch({type: 'LOGIN_START'});

        const formData = new FormData();
        formData.append('username', username);
        formData.append('password', password);

        fetch('/api/login', {method: 'POST', body: formData}).then(res => {
          dispatch({type: 'LOGIN_END', username: res.status === 200 ? username : null});
        });
      };
    }

    function initUsername() {
      return function (dispatch) {
        dispatch({type: 'LOGIN_START'});

        fetch('/api/username').then(res => res.status === 200 && res.text()).then(username => {
          dispatch({type: 'LOGIN_END', username: username || null});
        });
      };
    }

    function fetchPages() {
      return function (dispatch) {
        dispatch({type: 'FETCH_PAGES_START'});

        const pagesBaseUrl = 'http://www.dandad.org/manage/pages/basepage/?p=';
        const domParser = new DOMParser();

        const fetchPage = page => fetch('/api/get?url=' + pagesBaseUrl + page).then(res => res.text());

        fetchPage(0).then(body => {
          let doc = domParser.parseFromString(body, 'text/html');
          const lastPage = Number(doc.querySelector('.pagination a.end').innerHTML - 1);
          const fetchingPages = [];

          for (let i = 0; i <= lastPage; i++) fetchingPages.push(fetchPage(i));

          Promise.all(fetchingPages).then(allPages => {
            const pageDetails = [];

            allPages.forEach(page => {
              let doc = domParser.parseFromString(page, 'text/html');
              let rows = doc.querySelectorAll('#result_list tbody tr');

              [].forEach.call(rows, row => pageDetails.push({
                id:           Number(row.querySelector('th:nth-child(2) a').attributes.href.value.match(/\/([0-9]+)\/$/)[1]),
                title:        row.querySelector('th:nth-child(2) a').text,
                slug:         row.querySelector('td:nth-child(3)').innerHTML,
                contentType:  row.querySelector('td:nth-child(4)').innerHTML,
                isPublished:  row.querySelector('td:nth-child(5) input').checked,
                isRestricted: row.querySelector('td:nth-child(7) img').alt === 'True'
              }));
            });

            dispatch({type: 'FETCH_PAGES_END', pages: pageDetails});
          });
        });
      };
    }

    function initPages() {
      return {type: 'FETCH_PAGES_END', pages: JSON.parse(window.localStorage.dandadAuditorPages || '[]')};
    }

    function sortPages(column) {
      return {type: 'SORT_PAGES', column};
    }

    return {
      login,
      initUsername,
      fetchPages,
      initPages,
      sortPages
    };
  }
);