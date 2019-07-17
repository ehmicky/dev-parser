import { parsers } from './generic/main.js'
import { normalizeNode } from './normalize/main.js'

export const callParsers = function({ code, allowedParsers, top, parserOpts }) {
  return Object.values(parsers)
    .filter(parser => isAllowed(parser, allowedParsers))
    .filter(parser => supportsSyntaxes(parser, parserOpts))
    .map(parser => callParser({ parser, code, top, parserOpts }))
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

const callParser = function({
  parser: { title, parse },
  code,
  top,
  parserOpts,
  parserOpts: { locations },
}) {
  try {
    const node = parse(code, parserOpts)
    const nodeA = normalizeNode(node, { top, locations })
    return { title, node: nodeA }
  } catch (error) {
    return { title, error }
  }
}
