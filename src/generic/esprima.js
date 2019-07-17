import { parse as esprimaParse } from 'esprima'

const parse = function(
  code,
  { sourceType, loose, locations, comment, jsx, tokens },
) {
  const parseOpts = getParseOpts({
    sourceType,
    loose,
    locations,
    comment,
    jsx,
    tokens,
  })

  const node = esprimaParse(code, parseOpts)
  return node
}

export const esprima = {
  id: 'esprima',
  title: 'Esprima',
  syntaxes: ['jsx'],
  parse,
}

const getParseOpts = function({
  sourceType,
  loose,
  locations,
  comment,
  jsx,
  tokens,
}) {
  return {
    sourceType,
    tolerant: loose,
    loc: locations,
    range: locations,
    comment,
    jsx,
    tokens,
  }
}
