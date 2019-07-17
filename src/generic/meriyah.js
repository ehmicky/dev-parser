import { parse as meriyahParse } from 'meriyah'

const parse = function(
  code,
  { sourceType, loose, strict, locations, parens, next, jsx, source },
) {
  const parseOpts = getParseOpts({
    sourceType,
    loose,
    strict,
    locations,
    parens,
    next,
    jsx,
    source,
  })

  const node = meriyahParse(code, parseOpts)
  return node
}

export const meriyah = {
  id: 'meriyah',
  title: 'Meriyah',
  syntaxes: ['jsx'],
  parse,
}

const getParseOpts = function({
  sourceType,
  loose,
  strict,
  locations,
  parens,
  next,
  jsx,
  source,
}) {
  return {
    module: sourceType === 'module',
    globalReturn: loose,
    specDeviation: loose,
    impliedStrict: strict,
    loc: locations,
    ranges: locations,
    preserveParens: parens,
    raw: true,
    directives: true,
    next,
    jsx,
    source,
  }
}
