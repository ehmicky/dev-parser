import { parse as espreeParse } from 'espree'

const parse = function(
  code,
  { next, sourceType, locations, comment, lenient, strict, jsx, tokens },
) {
  const parseOpts = getParseOpts({
    next,
    sourceType,
    locations,
    comment,
    lenient,
    strict,
    jsx,
    tokens,
  })

  const node = espreeParse(code, parseOpts)
  return node
}

export const espree = {
  id: 'espree',
  title: 'Espree',
  syntaxes: ['jsx'],
  parse,
}

const getParseOpts = function({
  next,
  sourceType,
  locations,
  comment,
  lenient,
  strict,
  jsx,
  tokens,
}) {
  return {
    sourceType: next ? sourceType : 'script',
    loc: locations,
    range: locations,
    comment,
    ...(next ? { ecmaVersion: 2019 } : {}),
    ecmaFeatures: {
      globalReturn: lenient,
      impliedStrict: strict,
      jsx,
    },
    tokens,
  }
}
