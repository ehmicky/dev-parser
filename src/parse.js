import { parsers } from './generic/main.js'

export const callParsers = function({ code, allowedParsers, parserOpts }) {
  return Object.values(parsers)
    .filter(parser => isAllowed(parser, allowedParsers))
    .filter(parser => supportsSyntaxes(parser, parserOpts))
    .map(parser => callParser({ parser, code, parserOpts }))
}

const isAllowed = function({ id }, allowedParsers) {
  return allowedParsers === undefined || allowedParsers.includes(id)
}

const supportsSyntaxes = function(parser, { typescript, flow, jsx }) {
  const syntaxes = { typescript, flow, jsx }
  return Object.entries(syntaxes).every(
    ([syntax, enabled]) => !enabled || parser.syntaxes.includes(syntax),
  )
}

const callParser = function({ parser: { title, parse }, code, parserOpts }) {
  try {
    const node = parse(code, parserOpts)
    return { title, node }
  } catch (error) {
    return { title, error }
  }
}
