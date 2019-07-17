import { LOCATION_ATTRS } from './attributes.js'

export const sortKeys = function(node, { sort }) {
  if (!sort) {
    return node
  }

  return sortObject(node, keysComparator)
}

const sortObject = function(object, comparator) {
  // eslint-disable-next-line fp/no-mutating-methods
  const keys = Object.keys(object).sort(comparator)
  return Object.fromEntries(keys.map(key => [key, object[key]]))
}

const keysComparator = function(keyA, keyB) {
  if (keyA === 'type') {
    return -1
  }

  if (keyB === 'type') {
    return 1
  }

  const cleanIndex = sortCleanAttr(keyA, keyB)

  if (cleanIndex !== undefined) {
    return cleanIndex
  }

  return compareKeys(keyA, keyB)
}

const sortCleanAttr = function(keyA, keyB) {
  const [cleanIndexA, cleanIndexB] = getCleanIndexes(keyA, keyB)

  if (cleanIndexA === undefined) {
    return
  }

  if (cleanIndexA === -1) {
    return -1
  }

  if (cleanIndexB === -1) {
    return 1
  }

  return compareKeys(cleanIndexA, cleanIndexB)
}

const getCleanIndexes = function(keyA, keyB) {
  const cleanIndexA = LOCATION_ATTRS.indexOf(keyA)
  const cleanIndexB = LOCATION_ATTRS.indexOf(keyB)

  if (cleanIndexA === -1 && cleanIndexB === -1) {
    return []
  }

  return [cleanIndexA, cleanIndexB]
}

const compareKeys = function(keyA, keyB) {
  if (keyA > keyB) {
    return 1
  }

  return -1
}
