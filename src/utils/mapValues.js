export default (object, f) => Object.keys(object).map(k => f(object[k], k))
