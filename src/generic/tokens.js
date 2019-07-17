export const normalizeTokens = function(name, tokens) {
  if (tokens === undefined) {
    return
  }

  const tokensA = tokens.map(normalizeToken)
  return { [name]: tokensA }
}

const normalizeToken = function({ type: { label: type }, value }) {
  if (value === undefined) {
    return { type }
  }

  return { type, value }
}
