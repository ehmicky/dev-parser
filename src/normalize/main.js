import { traverse } from './traverse.js'
import { removeLocations } from './locations.js'
import { sortKeys } from './sort.js'

export const normalizeNode = function(node, { top, locations }) {
  const nodeA = getTopNode(node, top)

  return traverse(nodeA, normalize.bind(null, locations))
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

const normalize = function(locations, node) {
  const nodeA = removeLocations(node, locations)
  const nodeB = sortKeys(nodeA)
  return nodeB
}
