import { abstractParser } from './abstract_parser/main.js'

// Retrieve all JavaScript parsers to be used
export const getParsers = function({ allowedParsers, parserOpts }) {
  return Object.values(abstractParser)
    .filter(parser => isAllowed(parser, allowedParsers))
    .filter(parser => supportsSyntaxes(parser, parserOpts))
}

// The `parsers` option can whitelist specific parsers
const isAllowed = function({ id }, allowedParsers) {
  return allowedParsers === undefined || allowedParsers.includes(id)
}

// When using the `typescript`, `flow` or `jsx` options, we only use parsers
// that support those syntaxes
const supportsSyntaxes = function(parser, { typescript, flow, jsx }) {
  const syntaxes = { typescript, flow, jsx }
  return Object.entries(syntaxes).every(
    ([syntax, enabled]) => !enabled || parser.syntaxes.includes(syntax),
  )
}

// Parse JavaScript code with several parsers
export const callParsers = function({ parsers, code, parserOpts }) {
  return parsers.map(parser => callParser({ parser, code, parserOpts }))
}

const callParser = function({ parser: { title, parse }, code, parserOpts }) {
  try {
    const node = parse(code, { ...parserOpts, sort: true })
    return { title, node }
  } catch (error) {
    return { title, error }
  }
}
