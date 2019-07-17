import { parse as espreeParse } from 'espree'

const parse = function(
  code,
  { next, sourceType, loose, strict, locations, comments, tokens, jsx },
) {
  return espreeParse(code, {
    sourceType: next ? sourceType : 'script',
    loc: locations,
    range: locations,
    comment: comments,
    ...(next ? { ecmaVersion: 2019 } : {}),
    ecmaFeatures: {
      globalReturn: loose,
      impliedStrict: strict,
      jsx,
    },
    tokens,
  })
}

export const espree = {
  id: 'espree',
  title: 'Espree',
  syntaxes: ['jsx'],
  parse,
}
