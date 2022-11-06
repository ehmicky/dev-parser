import { inspect } from 'node:util'

import { removeDelimiters } from './delimiters.js'
import { removeIndent } from './indent.js'

// Serialize AST node produced by each parser
export const serializeNode = function (node, { chalk }) {
  const nodeString = inspect(node, {
    ...INSPECT_OPTS,
    colors: chalk.level !== 0,
  })
  const nodeStringA = removeDelimiters(nodeString)
  const nodeStringB = removeIndent(nodeStringA)
  return nodeStringB
}

// eslint-disable-next-line unicorn/no-null
const INSPECT_OPTS = { depth: null, maxArrayLength: null }
