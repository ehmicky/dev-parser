import { parse as esprimaParse } from 'esprima'

const parse = function(
  code,
  { sourceType, loose, locations, comments, tokens, jsx },
) {
  return esprimaParse(code, {
    sourceType,
    tolerant: loose,
    loc: locations,
    range: locations,
    comment: comments,
    jsx,
    tokens,
  })
}

export const esprima = {
  id: 'esprima',
  title: 'Esprima',
  syntaxes: ['jsx'],
  parse,
}
