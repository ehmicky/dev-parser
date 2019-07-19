export const validateBasicOpts = function(opts) {
  if (!isPlainObject(opts)) {
    throw new TypeError(`Options must be a plain object: ${opts}`)
  }
}

// Is a plain object, including `Object.create(null)`
const isPlainObject = function(val) {
  return (
    typeof val === 'object' &&
    val !== null &&
    // istanbul ignore next
    (val.constructor === Object || val.constructor === undefined)
  )
}
