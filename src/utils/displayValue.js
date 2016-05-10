export default value => {
  switch (typeof value) {
    case 'boolean': return value ? 'Yes' : 'No'
    default: return value.toString()
  }
}
