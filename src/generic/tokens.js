export const normalizeTokens = function(name, allTokens) {
  if (allTokens === undefined) {
    return
  }

  const allTokensA = allTokens.map(normalizeToken)
  return { [name]: allTokensA }
}

const normalizeToken = function({ type: { label: type }, value }) {
  if (value === undefined) {
    return { type }
  }

  return { type, value }
}
