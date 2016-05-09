import React from 'react'
import arrayToCsv from '../utils/arrayToCsv'

function handleDownload (data, filePrefix) {
  let anchor = document.createElement('a')
  anchor.href = 'data:text/csv;charset=UTF-8,' + encodeURI(arrayToCsv(data))
  anchor.download = `${filePrefix} ${Date.now()}`

  document.body.appendChild(anchor)
  anchor.click()
  anchor.remove()
}

export default ({ className, data, filePrefix }) => {
  return (
    <a
      className={ className + ' uk-button' }
      onClick={ () => handleDownload(data, filePrefix) }>
      Download CSV
    </a>
  )
}
