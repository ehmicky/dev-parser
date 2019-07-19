import abstractParser from 'abstract-parser'
import {
  DEFAULT_OPTS as abstractDefaultOpts,
  EXAMPLE_OPTS as abstractExampleOpts,
} from 'abstract-parser/build/src/options.js'

import { handleOpts } from '../options.js'

// Normalize options and assign default values
export const getOpts = function(code, opts = {}) {
  if (typeof code !== 'string') {
    throw new TypeError(`Code must be a string: ${code}`)
  }

  const optsA = handleOpts(opts, DEFAULT_OPTS, EXAMPLE_OPTS)

  validateCustom(opts)

  const { parsers, ...parserOpts } = optsA
  const allowedParsers = getAllowedParsers(parsers)
  return { allowedParsers, parserOpts }
}

export const DEFAULT_OPTS = {
  ...abstractDefaultOpts,
  parsers: ['babel'],
}

export const EXAMPLE_OPTS = {
  ...DEFAULT_OPTS,
  ...abstractExampleOpts,
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
