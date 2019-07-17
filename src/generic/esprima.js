import { parse as esprimaParse } from 'esprima'

const parse = function(
  code,
  { sourceType, lenient, locations, comment, jsx, tokens },
) {
  const parseOpts = getParseOpts({
    sourceType,
    lenient,
    locations,
    comment,
    jsx,
    tokens,
  })

  const result = esprimaParse(code, parseOpts)
  return result
}

export const esprima = {
  id: 'esprima',
  name: 'Esprima',
  syntaxes: ['jsx'],
  parse,
}

const getParseOpts = function({
  sourceType,
  lenient,
  locations,
  comment,
  jsx,
  tokens,
}) {
  return {
    sourceType,
    tolerant: lenient,
    loc: locations,
    range: locations,
    comment,
    jsx,
    tokens,
  }
}
