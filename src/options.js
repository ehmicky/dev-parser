import { excludeKeys } from 'filter-obj'
import isPlainObj from 'is-plain-obj'
import { validate } from 'jest-validate'

// Validate options and assign default values
export const handleOpts = function (opts, defaultOpts, exampleConfig) {
  validateBasicOpts(opts)
  validate(opts, { exampleConfig })

  const optsA = excludeKeys(opts, isUndefined)
  const optsB = { ...defaultOpts, ...optsA }
  return optsB
}

export const validateBasicOpts = function (opts) {
  if (!isPlainObj(opts)) {
    throw new TypeError(`Options must be a plain object: ${opts}`)
  }
}

const isUndefined = function (key, value) {
  return value === undefined
}
