import { validate } from 'jest-validate'

import { abstractParser } from '../abstract_parser/main.js'
import { isPlainObject } from '../abstract_parser/utils.js'
import {
  DEFAULT_OPTS as abstractDefaultOpts,
  EXAMPLE_OPTS as abstractExampleOpts,
} from '../abstract_parser/options.js'

// Normalize options and assign default values
export const getOpts = function(code, opts = {}) {
  validateBasic(code, opts)
  validate(opts, { exampleConfig: EXAMPLE_OPTS })
  validateCustom(opts)

  const optsA = { ...DEFAULT_OPTS, ...opts }

  const { parsers: allowedParsers, ...parserOpts } = optsA
  return { allowedParsers, parserOpts }
}

const validateBasic = function(code, opts) {
  if (typeof code !== 'string') {
    throw new TypeError(`Code must be a string: ${code}`)
  }

  if (!isPlainObject(opts)) {
    throw new TypeError(`Options must be a plain object: ${opts}`)
  }
}

export const DEFAULT_OPTS = {
  ...abstractDefaultOpts,
  parsers: ['babel'],
}

export const EXAMPLE_OPTS = {
  ...abstractExampleOpts,
  ...DEFAULT_OPTS,
}

const validateCustom = function({ parsers }) {
  validateParsers(parsers)
}

const validateParsers = function(parsers) {
  if (parsers === undefined) {
    return
  }

  parsers.forEach(validateParser)
}

const validateParser = function(parser) {
  if (abstractParser[parser] !== undefined) {
    return
  }

  const parsers = Object.keys(abstractParser).join(', ')
  throw new TypeError(`Invalid parser '${parser}': must be one of ${parsers}.`)
}
