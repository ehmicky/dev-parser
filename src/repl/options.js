import { validate } from 'jest-validate'

import { validateBasicOpts } from '../utils.js'
import {
  DEFAULT_OPTS as defaultPrintOpts,
  EXAMPLE_OPTS as examplePrintOpts,
} from '../print/options.js'

import { DEFAULT_HISTORY } from './history.js'

// Normalize options and assign default values
// Do not handle options already handled by abstract-parser
export const getOpts = function(opts = {}) {
  validateBasicOpts(opts)
  validate(opts, { exampleConfig: EXAMPLE_OPTS })

  const optsA = { ...DEFAULT_OPTS, ...opts }

  const { history, colors, ...parseOpts } = optsA
  return { history, parseOpts, serializeOpts: { colors } }
}

const DEFAULT_OPTS = {
  ...defaultPrintOpts,
  history: DEFAULT_HISTORY,
}

const EXAMPLE_OPTS = {
  ...DEFAULT_OPTS,
  ...examplePrintOpts,
}
