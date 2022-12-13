import { validateBasicOpts } from '../parse/options.js'

import { DEFAULT_HISTORY } from './history.js'

// Normalize options and assign default values
// Do not handle options already handled by abstract-parser
export const getOpts = (opts = {}) => {
  validateBasicOpts(opts)
  const { history = DEFAULT_HISTORY, colors = true, ...parseOpts } = opts

  if (typeof colors !== 'boolean') {
    throw new TypeError(`Option "colors" must be a boolean: ${colors}`)
  }

  return { history, parseOpts, serializeOpts: { colors } }
}
