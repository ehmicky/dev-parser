export const removeDelimiters = function(nodeString) {
  return REGEXPS.reduce(reduceDelimiter, nodeString)
}

const reduceDelimiter = function(nodeString, regExp) {
  return nodeString.replace(regExp, '')
}

// Opening/closing { or [ are omitted
const START_ARRAY_REGEXP = /^\[[\n ]/gu
const END_ARRAY_REGEXP = /[\n ]\]$/gu
const START_OBJECT_REGEXP = /^\{[\n ]/gu
const END_OBJECT_REGEXP = /[\n ]\}$/gu

const REGEXPS = [
  START_ARRAY_REGEXP,
  END_ARRAY_REGEXP,
  START_OBJECT_REGEXP,
  END_OBJECT_REGEXP,
]
