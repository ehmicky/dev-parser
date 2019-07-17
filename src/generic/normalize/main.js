import { traverse } from './traverse.js'
import { getRemovedAttrs, removeAttrs } from './attributes.js'
import { sortKeys } from './sort.js'

export const normalizeNode = function(
  node,
  { top, locations, comments, sort },
) {
  const nodeA = getTopNode(node, top)

  const removedAttrs = getRemovedAttrs({ locations, comments })

  if (!sort && removedAttrs.length === 0) {
    return nodeA
  }

  return traverse(nodeA, normalize.bind(null, { removedAttrs, sort }))
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

const normalize = function({ removedAttrs, sort }, node) {
  const nodeA = removeAttrs(node, removedAttrs)
  const nodeB = sortKeys(nodeA, { sort })
  return nodeB
}
