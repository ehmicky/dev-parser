import { parse as typescriptEstreeParse } from '@typescript-eslint/typescript-estree'

const parse = function(code, { loose, locations, comment, jsx, tokens }) {
  const parseOpts = getParseOpts({
    loose,
    locations,
    comment,
    jsx,
    tokens,
  })

  try {
    const node = typescriptEstreeParse(code, parseOpts)
    return node
  } catch (error) {
    throw normalizeError(error)
  }
}

export const typescriptEstree = {
  id: 'typescriptEstree',
  title: 'TypeScript-ESTree',
  syntaxes: ['typescript', 'jsx'],
  parse,
}

const getParseOpts = function({ loose, locations, comment, jsx, tokens }) {
  return {
    errorOnUnknownASTType: loose,
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
