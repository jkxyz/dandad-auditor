export default function fetchAndParse (domParser, url, finishedCallback = null) {
  return fetch(`/api/get?url=${url}`).then(r => r.ok ? r.text() : null).then(
    body => {
      if (body === null || !body.toString().trim()) {
        return null
      }

      let doc = domParser.parseFromString(body, 'text/html')
      doc.url = url

      if (finishedCallback !== null) {
        finishedCallback(doc)
      }

      return doc
    }
  )
}
