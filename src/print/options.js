import { validateBasicOpts } from '../parse/options.js'

// Normalize options and assign default values
// Do not handle options already handled by abstract-parser
export const getOpts = function (opts = {}) {
  validateBasicOpts(opts)
  const { colors = true, ...parseOpts } = opts

  if (typeof colors !== 'boolean') {
    throw new TypeError(`Option "colors" must be a boolean: ${colors}`)
  }

  return { colors, parseOpts }
}
