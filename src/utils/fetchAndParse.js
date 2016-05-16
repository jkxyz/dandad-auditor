export default (domParser, sessionId, url, finishedCallback = () => null) => {
  return fetch(`/api/proxy?session_id=${sessionId}&url=${url}`)
    .then(r => r.ok ? r.json() : null)
    .then(response => {
      if (response === null) {
        return null
      }

      finishedCallback(response)

      response.doc = domParser.parseFromString(response.body, 'text/html')

      return response
    })
}
