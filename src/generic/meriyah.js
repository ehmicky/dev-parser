import { parse as meriyahParse } from 'meriyah'

const parse = function(
  code,
  { sourceType, loose, strict, locations, parens, next, jsx, source },
) {
  return meriyahParse(code, {
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
  })
}

export const meriyah = {
  id: 'meriyah',
  title: 'Meriyah',
  syntaxes: ['jsx'],
  parse,
}
