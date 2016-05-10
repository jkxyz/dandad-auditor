import React from 'react'
import arrayToCsv from '../utils/arrayToCsv'

let downloadAsCSV = (data, filePrefix) => {
  let anchor = document.createElement('a')
  anchor.href = 'data:text/csv;charset=UTF-8,' + encodeURI(arrayToCsv(data))
  anchor.download = `${filePrefix} ${Date.now()}.csv`

  document.body.appendChild(anchor)
  anchor.click()
  anchor.remove()
}

export default ({ className, data, filePrefix }) =>
  <a
    className={ className + ' uk-button' }
    onClick={ () => downloadAsCSV(data, filePrefix) }>
    Download CSV
  </a>
