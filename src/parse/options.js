// eslint-disable-next-line import/no-namespace
import * as abstractParser from 'abstract-parser'
import isPlainObj from 'is-plain-obj'

// Normalize options and assign default values
export const getOpts = function (code, opts = {}) {
  if (typeof code !== 'string') {
    throw new TypeError(`Code must be a string: ${code}`)
  }

  validateBasicOpts(opts)
  const { parsers = ['babel'], ...parserOpts } = opts
  validateParsers(parsers)
  const allowedParsers = getAllowedParsers(parsers)
  return { allowedParsers, parserOpts }
}

export const validateBasicOpts = function (opts) {
  if (!isPlainObj(opts)) {
    throw new TypeError(`Options must be a plain object: ${opts}`)
  }
}

const validateParsers = function (parsers) {
  if (!Array.isArray(parsers)) {
    throw new TypeError(`Option "parsers" must be an array: ${parsers}`)
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
  return parsers.some(isAll) ? Object.keys(abstractParser) : parsers
}

const isAll = function (parser) {
  return parser === 'all'
}
