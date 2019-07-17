export const removeAttrs = function(node, { locations, comments }) {
  const attrs = getAttrs({ locations, comments })

  if (attrs.length === 0) {
    return node
  }

  return Object.fromEntries(
    Object.entries(node).filter(([attr]) => !attrs.includes(attr)),
  )
}

const getAttrs = function({ locations, comments }) {
  return [
    ...(locations ? [] : LOCATION_ATTRS),
    ...(comments ? [] : COMMENT_ATTRS),
  ]
}

export const LOCATION_ATTRS = ['start', 'end', 'range', 'loc']
const COMMENT_ATTRS = [
  'comments',
  'innerComments',
  'leadingComments',
  'trailingComments',
]
