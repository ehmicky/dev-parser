import { inspect } from 'util'

import { removeDelimiters } from './delimiters.js'
import { removeIndent } from './indent.js'

// Serialize AST node produced by each parser
export const serializeNode = function(node, { chalk }) {
  const nodeString = inspect(node, {
    ...INSPECT_OPTS,
    colors: chalk !== undefined,
  })
  const nodeStringA = removeDelimiters(nodeString)
  const nodeStringB = removeIndent(nodeStringA)
  return nodeStringB
}

const INSPECT_OPTS = { depth: null, maxArrayLength: null }
