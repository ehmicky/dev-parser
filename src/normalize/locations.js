export const removeLocations = function(node, locations) {
  if (locations) {
    return node
  }

  return Object.fromEntries(Object.entries(node).filter(isNotLocation))
}

const isNotLocation = function([key]) {
  return !LOCATION_ATTRS.includes(key)
}

export const LOCATION_ATTRS = ['start', 'end', 'loc', 'range']
