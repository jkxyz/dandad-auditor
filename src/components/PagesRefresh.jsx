define(['react', 'react-redux'], (React, ReactRedux) => {

  const PagesRefresh = ({ disabled, isRefreshing, onButtonClick }) => {

    return <button type='button' className='uk-button uk-button-success' onClick={onButtonClick} disabled={disabled}>
      {isRefreshing ? 'Fetching pages...' : 'Refresh Pages'}
    </button>

  }

  const mapStateToProps = state => {
    return {
      disabled: state.isRefreshingPages || !state.login.isLoggedIn
    , isRefreshing: state.isRefreshingPages
    }
  }

  const mapDispatchToProps = dispatch => {
    return {

      onButtonClick: e => {
        
        dispatch({ type: 'refreshPagesStart' })

        const pagesUrl = 'http://www.dandad.org/manage/pages/basepage/?p='
        const parser   = new DOMParser

        // Fetch the first page to get the count of pages, then fetch concurrently
        $.ajax('/api/get?url=' + pagesUrl + 0).success((res) => {

          const doc      = parser.parseFromString(res, 'text/html')
          const lastPage = Number(doc.querySelector('.pagination a.end').innerHTML) - 1
          const pageReqs = []

          for (let currentPage = 0; currentPage <= lastPage; currentPage++) {

            pageReqs.push($.ajax('/api/get?url=' + pagesUrl + currentPage).promise())

          }

          $.when.apply(null, pageReqs).done(() => {

            const cmsPages = Array.prototype.map.call(arguments, p => { return p[0] })
            const pages    = []

            for (let i = 0; i < cmsPages.length; i++) {

              let doc  = parser.parseFromString(cmsPages[i], 'text/html')
              let rows = doc.querySelectorAll('#result_list tbody tr')

              for (let j = 0; j < rows.length; j++) {

                let row = rows[j]
                
                pages.push({
                  title:        row.querySelector('th:nth-child(2) a').text
                , slug:         row.querySelector('td:nth-child(3)').innerHTML
                , contentType:  row.querySelector('td:nth-child(4)').innerHTML
                , isPublished:  row.querySelector('td:nth-child(5) input').checked
                , isRestricted: row.querySelector('td:nth-child(7) img').alt === 'True'
                })

              }

            }

            dispatch({ type: 'refreshPagesEnd', pages })

          })

        })

      }

    }
  }

  return ReactRedux.connect(mapStateToProps, mapDispatchToProps)(PagesRefresh)

})
