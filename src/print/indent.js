// Remove the extra indentation created by the delimiters removal
export const removeIndent = function (nodeString) {
  const indent = getIndent(nodeString)
  return nodeString
    .split('\n')
    .map((line) => line.slice(indent))
    .join('\n')
}

const getIndent = function (nodeString) {
  const lengths = nodeString.match(INDENT_REGEXP).map(getSpacesLength)
  const indent = Math.min(...lengths)
  return indent
}

const INDENT_REGEXP = /^ */gmu

const getSpacesLength = function (spaces) {
  return spaces.length
}
