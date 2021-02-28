import { handleOpts } from '../options.js'
import {
  DEFAULT_OPTS as defaultParseOpts,
  EXAMPLE_OPTS as exampleParseOpts,
} from '../parse/options.js'

// Normalize options and assign default values
// Do not handle options already handled by abstract-parser
export const getOpts = function (opts = {}) {
  const optsA = handleOpts(opts, DEFAULT_OPTS, EXAMPLE_OPTS)

  const { colors, ...parseOpts } = optsA
  return { colors, parseOpts }
}

export const DEFAULT_OPTS = {
  ...defaultParseOpts,
}

export const EXAMPLE_OPTS = {
  ...DEFAULT_OPTS,
  ...exampleParseOpts,
  colors: true,
}
