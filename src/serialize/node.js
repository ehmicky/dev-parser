import { inspect } from 'util'

import { stdout as supportsColor } from 'supports-color'

import { removeDelimiters } from './delimiters.js'

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
