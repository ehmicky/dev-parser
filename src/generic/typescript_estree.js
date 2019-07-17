import { parse as typescriptEstreeParse } from '@typescript-eslint/typescript-estree'

const parse = function(code, { lenient, locations, comment, jsx, tokens }) {
  const parseOpts = getParseOpts({
    lenient,
    locations,
    comment,
    jsx,
    tokens,
  })

  try {
    const result = typescriptEstreeParse(code, parseOpts)
    return result
  } catch (error) {
    throw normalizeError(error)
  }
}

export const typescriptEstree = {
  id: 'typescriptEstree',
  name: 'TypeScript-ESTree',
  syntaxes: ['typescript', 'jsx'],
  parse,
}

const getParseOpts = function({ lenient, locations, comment, jsx, tokens }) {
  return {
    errorOnUnknownASTType: lenient,
    loc: locations,
    range: locations,
    comment,
    jsx,
    useJSXTextNode: jsx,
    tokens,
  }
}

// typescript-estree errors are not error instances
const normalizeError = function({ message, lineNumber, column }) {
  return new Error(`${message} (${lineNumber}:${column})`)
}
