export const removeIndent = function(nodeString) {
  const lengths = nodeString.match(INDENT_REGEXP).map(getSpacesLength)
  const minLength = Math.min(...lengths)
  return nodeString
    .split('\n')
    .map(line => line.slice(minLength))
    .join('\n')
}

const getSpacesLength = function(spaces) {
  return spaces.length
}

const INDENT_REGEXP = /^( )*/gmu
