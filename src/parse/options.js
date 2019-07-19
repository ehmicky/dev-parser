import { validate } from 'jest-validate'

import { abstractParser } from '../abstract_parser/main.js'
import {
  DEFAULT_OPTS as abstractDefaultOpts,
  EXAMPLE_OPTS as abstractExampleOpts,
} from '../abstract_parser/options.js'
import { validateBasicOpts } from '../utils.js'

// Normalize options and assign default values
export const getOpts = function(code, opts = {}) {
  if (typeof code !== 'string') {
    throw new TypeError(`Code must be a string: ${code}`)
  }

  validateBasicOpts(opts)
  validate(opts, { exampleConfig: EXAMPLE_OPTS })
  validateCustom(opts)

  const optsA = { ...DEFAULT_OPTS, ...opts }

  const { parsers, ...parserOpts } = optsA
  const allowedParsers = getAllowedParsers(parsers)
  return { allowedParsers, parserOpts }
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
  if (abstractParser[parser] !== undefined || isAll(parser)) {
    return
  }

  const parsers = Object.keys(abstractParser).join(', ')
  throw new TypeError(`Invalid parser '${parser}': must be one of ${parsers}.`)
}

// Can use `all` in `parsers` to use all parsers
const getAllowedParsers = function(parsers) {
  if (parsers.some(isAll)) {
    return Object.keys(abstractParser)
  }

  return parsers
}

const isAll = function(parser) {
  return parser === 'all'
}
