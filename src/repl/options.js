import { validate } from 'jest-validate'

import { isPlainObject } from '../abstract_parser/utils.js'
import {
  DEFAULT_OPTS as defaultPrintOpts,
  EXAMPLE_OPTS as examplePrintOpts,
} from '../print/options.js'

import { DEFAULT_HISTORY } from './history.js'

// Normalize options and assign default values
// Do not handle options already handled by abstract-parser
export const getOpts = function(opts = {}) {
  validateBasic(opts)
  validate(opts, { exampleConfig: EXAMPLE_OPTS })

  const optsA = { ...DEFAULT_OPTS, ...opts }

  const { history, colors, ...parseOpts } = optsA
  return { history, parseOpts, serializeOpts: { colors } }
}

const validateBasic = function(opts) {
  if (!isPlainObject(opts)) {
    throw new TypeError(`Options must be a plain object: ${opts}`)
  }
}

const DEFAULT_OPTS = {
  ...defaultPrintOpts,
  history: DEFAULT_HISTORY,
}

const EXAMPLE_OPTS = {
  ...DEFAULT_OPTS,
  ...examplePrintOpts,
}
