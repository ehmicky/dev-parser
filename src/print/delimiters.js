// Remove the outer [] and {} so the output takes fewer lines
export const removeDelimiters = (nodeString) =>
  REGEXPS.reduce(reduceDelimiter, nodeString)

const reduceDelimiter = (nodeString, regExp) => nodeString.replace(regExp, '')

const START_ARRAY_REGEXP = /^ *\[ *[\n ]/gu
const END_ARRAY_REGEXP = /[\n ] *\] *$/gu
const START_OBJECT_REGEXP = /^ *\{ *[\n ]/gu
const END_OBJECT_REGEXP = /[\n ] *\} *$/gu

const REGEXPS = [
  START_ARRAY_REGEXP,
  END_ARRAY_REGEXP,
  START_OBJECT_REGEXP,
  END_OBJECT_REGEXP,
]
