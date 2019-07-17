import { parse as espreeParse } from 'espree'

const parse = function(
  code,
  { next, sourceType, locations, comments, loose, strict, jsx, tokens },
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
