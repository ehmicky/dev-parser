import { parse as meriyahParse } from 'meriyah'

const parse = function(
  code,
  { sourceType, lenient, strict, locations, preserveParens, next, jsx, source },
) {
  const parseOpts = getParseOpts({
    sourceType,
    lenient,
    strict,
    locations,
    preserveParens,
    next,
    jsx,
    source,
  })

  const result = meriyahParse(code, parseOpts)
  return result
}

export const meriyah = {
  id: 'meriyah',
  name: 'Meriyah',
  syntaxes: ['jsx'],
  parse,
}

const getParseOpts = function({
  sourceType,
  lenient,
  strict,
  locations,
  preserveParens,
  next,
  jsx,
  source,
}) {
  return {
    module: sourceType === 'module',
    globalReturn: lenient,
    specDeviation: lenient,
    impliedStrict: strict,
    loc: locations,
    ranges: locations,
    preserveParens,
    raw: true,
    directives: true,
    next,
    jsx,
    source,
  }
}
