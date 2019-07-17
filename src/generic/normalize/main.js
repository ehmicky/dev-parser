import { traverse } from './traverse.js'
import { removeAttrs } from './attributes.js'
import { sortKeys } from './sort.js'

export const normalizeNode = function(
  node,
  { top, locations, comments, sort },
) {
  const nodeA = getTopNode(node, top)

  return traverse(nodeA, normalize.bind(null, { locations, comments, sort }))
}

const getTopNode = function(node, top) {
  if (top) {
    return node
  }

  if (node.program !== undefined) {
    return node.program.body
  }

  return node.body
}

const normalize = function({ locations, comments, sort }, node) {
  const nodeA = removeAttrs(node, { locations, comments })
  const nodeB = sortKeys(nodeA, { sort })
  return nodeB
}
