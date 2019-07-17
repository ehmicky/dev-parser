import { inspect } from 'util'

import { stdout as supportsColor } from 'supports-color'

export const serializeNode = function(node) {
  const nodeString = inspect(node, INSPECT_OPTS)
  const nodeStringA = removeDelimiters(nodeString)
  return nodeStringA
}

const INSPECT_OPTS = {
  depth: null,
  maxArrayLength: null,
  colors: supportsColor,
}

const removeDelimiters = function(nodeString) {
  return nodeString
    .replace(START_DELIMITER_REGEXP, '')
    .replace(END_DELIMITER_REGEXP, '')
    .replace(INDENTATION_REGEXP, '')
}

// Opening/closing { or [ are omitted
const START_DELIMITER_REGEXP = /^[{[][\n ]/u
const END_DELIMITER_REGEXP = /[\n ][}\]]$/u
// Initial indentation is removed
const INDENTATION_REGEXP = /^ {2}/gmu
