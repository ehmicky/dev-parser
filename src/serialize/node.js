import { inspect } from 'util'

import { stdout as supportsColor } from 'supports-color'

import { removeDelimiters } from './delimiters.js'
import { removeIndent } from './indent.js'

export const serializeNode = function(node) {
  const nodeString = inspect(node, INSPECT_OPTS)
  const nodeStringA = removeDelimiters(nodeString)
  const nodeStringB = removeIndent(nodeStringA)
  return nodeStringB
}

const INSPECT_OPTS = {
  depth: null,
  maxArrayLength: null,
  colors: supportsColor,
}
