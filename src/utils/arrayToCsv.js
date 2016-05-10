import displayValue from './displayValue'
import mapValues from './mapValues'

let sanitizedValue = value => `"${displayValue(value).replace(/"/, '\\"')}"`

export default items => [
  Object.keys(items[0]),
  ...items.map(item => mapValues(item, val => sanitizedValue(val)))
].join('\n')
