// eslint-disable-next-line import/no-namespace
import * as abstractParser from 'abstract-parser'

import { handleOpts } from '../options.js'

// Normalize options and assign default values
export const getOpts = function (code, opts = {}) {
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
  parsers: ['babel'],
  // Forwarded to abstract-parser
  legacy: false,
  script: false,
  loose: false,
  strict: false,
  top: false,
  sort: false,
  locations: false,
  comments: false,
  tokens: false,
  parens: false,
  typescript: false,
  flow: false,
  jsx: false,
}

export const EXAMPLE_OPTS = {
  ...DEFAULT_OPTS,
  // Forwarded to abstract-parser
  source: 'filename.js',
}

const validateCustom = function ({ parsers }) {
  validateParsers(parsers)
}

const validateParsers = function (parsers) {
  if (parsers === undefined) {
    return
  }

  parsers.forEach(validateParser)
}

const validateParser = function (parser) {
  if (abstractParser[parser] !== undefined || isAll(parser)) {
    return
  }

  const parsers = Object.keys(abstractParser).join(', ')
  throw new TypeError(`Invalid parser '${parser}': must be one of ${parsers}.`)
}

// Can use `all` in `parsers` to use all parsers
const getAllowedParsers = function (parsers) {
  if (parsers.some(isAll)) {
    return Object.keys(abstractParser)
  }

  return parsers
}

const isAll = function (parser) {
  return parser === 'all'
}
