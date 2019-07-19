import { validate } from 'jest-validate'

import { isPlainObject } from '../abstract_parser/utils.js'
import {
  DEFAULT_OPTS as defaultParseOpts,
  EXAMPLE_OPTS as exampleParseOpts,
} from '../parse/options.js'

import { DEFAULT_COLORS } from './colors.js'

// Normalize options and assign default values
// Do not handle options already handled by abstract-parser
export const getOpts = function(opts = {}) {
  validateBasic(opts)
  validate(opts, { exampleConfig: EXAMPLE_OPTS })

  const optsA = { ...DEFAULT_OPTS, ...opts }

  const { colors, ...parseOpts } = optsA
  return { colors, parseOpts }
}

const validateBasic = function(opts) {
  if (!isPlainObject(opts)) {
    throw new TypeError(`Options must be a plain object: ${opts}`)
  }
}

export const DEFAULT_OPTS = {
  ...defaultParseOpts,
  colors: DEFAULT_COLORS,
}

export const EXAMPLE_OPTS = {
  ...exampleParseOpts,
  ...DEFAULT_OPTS,
}
