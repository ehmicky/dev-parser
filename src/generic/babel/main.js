import { parse as babelParse } from '@babel/parser'

import { normalizeTokens } from '../tokens.js'

import { getPlugins } from './plugins.js'

const parse = function(
  plugins,
  code,
  {
    typescript,
    flow,
    jsx,
    next,
    sourceType,
    loose,
    strict,
    locations,
    tokens,
    source,
  },
) {
  const parseOpts = getParseOpts(plugins, {
    typescript,
    flow,
    jsx,
    next,
    sourceType,
    loose,
    strict,
    locations,
    tokens,
    source,
  })

  const node = babelParse(code, parseOpts)

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

const getParseOpts = function(
  plugins,
  {
    typescript,
    flow,
    jsx,
    next,
    sourceType,
    loose,
    strict,
    locations,
    tokens,
    source,
  },
) {
  const pluginsA = getPlugins({ plugins, typescript, flow, jsx, next })

  return {
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
  }
}
