define([], () => {

  return () => {

    const pagesUrl  = 'http://www.dandad.org/manage/pages/basepage/?p='
    const domParser = new DOMParser
    const promise   = new $.Deferred

    $.ajax('/api/get?url=' + pagesUrl + 0).success(res => {

      let doc      = domParser.parseFromString(res, 'text/html')
      let lastPage = Number(doc.querySelector('.pagination a.end').innerHTML) - 1
      let pageReqs = []

      for (let currentPage = 0; currentPage <= lastPage; currentPage++) {

        pageReqs.push($.ajax('/api/get?url=' + pagesUrl + currentPage).promise())

      }

      $.when.apply(null, pageReqs).done(() => {

        let results = [].map.call(arguments, p => { return p[0] })
        let pages   = []

        for (let i = 0; i < results.length; i++) {

          let doc  = domParser.parseFromString(results[i], 'text/html')
          let rows = doc.querySelectorAll('#result_list tbody tr')

          for (let j = 0; j < rows.length; j++) {

            let row = rows[j]

            pages.push({

              id:           row.querySelector('th:nth-child(2) a').href.match(/\/([0-9]+)\/$/)[1]
            , title:        row.querySelector('th:nth-child(2) a').text
            , slug:         row.querySelector('td:nth-child(3)').innerHTML
            , contentType:  row.querySelector('td:nth-child(4)').innerHTML
            , isPublished:  row.querySelector('td:nth-child(5) input').checked
            , isRestricted: row.querySelector('td:nth-child(7) img').alt === 'True'

            })

          }

        }

        promise.resolve(pages)

      })

    })

    return promise

  }

})
