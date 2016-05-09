export default function arrayToCsv (items) {
  if (!items) {
    return ''
  }

  let rows = [Object.keys(items[0])]

  items.forEach(item => {
    let row = []

    for (let key in item) {
      if (typeof item[key] === 'boolean') {
        row.push(item[key] ? 'Yes' : 'No')
        continue
      }

      row.push(`"${item[key].toString().replace(/"/, '\\"')}"`)
    }

    rows.push(row.join(','))
  })

  return rows.join('\n')
}
