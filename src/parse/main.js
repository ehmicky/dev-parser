// eslint-disable-next-line import/no-namespace
import * as abstractParser from 'abstract-parser'

import { getOpts } from './options.js'

// Parse JavaScript code with several parsers
export const parse = (code, opts) => {
  const { allowedParsers, parserOpts } = getOpts(code, opts)
  const parsers = getParsers(allowedParsers, parserOpts)
  const results = callParsers(parsers, code, parserOpts)
  return results
}

// Retrieve all JavaScript parsers to be used
const getParsers = (allowedParsers, parserOpts) =>
  Object.values(abstractParser)
    .filter((parser) => isAllowed(parser, allowedParsers))
    .filter((parser) => supportsSyntaxes(parser, parserOpts))

// The `parsers` option can allow specific parsers
const isAllowed = ({ id }, allowedParsers) =>
  allowedParsers === undefined || allowedParsers.includes(id)

// When using the `typescript`, `flow` or `jsx` options, we only use parsers
// that support those syntaxes
const supportsSyntaxes = (parser, { typescript, flow, jsx }) => {
  const syntaxes = { typescript, flow, jsx }
  return Object.entries(syntaxes).every(
    ([syntax, enabled]) => !enabled || parser.syntaxes.includes(syntax),
  )
}

// Parse JavaScript code with several parsers
const callParsers = (parsers, code, parserOpts) =>
  parsers.map((parser) => callParser(parser, code, parserOpts))

const callParser = ({ title, parse: parseCode }, code, parserOpts) => {
  try {
    const node = parseCode(code, { ...parserOpts, sort: true })
    return { title, node }
  } catch (error) {
    return { title, error }
  }
}
