import { parse as babelParse } from '@babel/parser'

import { normalizeTokens } from '../tokens.js'

import { getPlugins } from './plugins.js'

const parse = function(
  plugins,
  code,
  {
    next,
    sourceType,
    loose,
    strict,
    locations,
    tokens,
    source,
    typescript,
    flow,
    jsx,
  },
) {
  const pluginsA = getPlugins({ plugins, typescript, flow, jsx, next })

  const node = babelParse(code, {
    sourceType,
    // eslint-disable-next-line id-length
    allowReturnOutsideFunction: loose,
    // eslint-disable-next-line id-length
    allowAwaitOutsideFunction: loose,
    // eslint-disable-next-line id-length
    allowSuperOutsideFunction: loose,
    // eslint-disable-next-line id-length
    allowImportExportEverywhere: loose,
    strictMode: strict,
    plugins: pluginsA,
    ranges: locations,
    tokens,
    sourceFilename: source,
  })

  return { ...node, ...normalizeTokens('tokens', node.tokens) }
}

export const babel = {
  id: 'babel',
  title: 'Babel',
  syntaxes: ['typescript', 'flow', 'jsx'],
  parse: parse.bind(null, []),
}

export const babelEstree = {
  id: 'babelEstree',
  title: 'Babel-ESTree',
  syntaxes: ['typescript', 'flow', 'jsx'],
  parse: parse.bind(null, ['estree']),
}
