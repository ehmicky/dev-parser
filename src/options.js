import { validate } from 'jest-validate'
import isPlainObj from 'is-plain-obj'

// Validate options and assign default values
export const handleOpts = function(opts, defaultOpts, exampleConfig) {
  validateBasicOpts(opts)
  validate(opts, { exampleConfig })

  return { ...defaultOpts, ...opts }
}

export const validateBasicOpts = function(opts) {
  if (!isPlainObj(opts)) {
    throw new TypeError(`Options must be a plain object: ${opts}`)
  }
}
