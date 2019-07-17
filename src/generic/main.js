import { esprima } from './esprima.js'
import { acorn } from './acorn.js'
import { espree } from './espree.js'
import { typescriptEstree } from './typescript_estree.js'
import { meriyah } from './meriyah.js'
import { babel, babelEstree } from './babel/main.js'
import { getOpts } from './options.js'
import { normalizeNode } from './normalize/main.js'

const getParsers = function() {
  return Object.fromEntries(PARSERS.map(getParser))
}

const PARSERS = [
  esprima,
  acorn,
  espree,
  typescriptEstree,
  meriyah,
  babel,
  babelEstree,
]

const getParser = function({ id, parse, ...parser }) {
  return [id, { id, ...parser, parse: parseCode.bind(null, parse) }]
}

const parseCode = function(parse, code, opts) {
  const optsA = getOpts(opts)
  const node = parse(code, optsA)
  const nodeA = normalizeNode(node, optsA)
  return nodeA
}

export const parsers = getParsers()
