// eslint-disable-next-line import/no-namespace
import * as acornMain from 'acorn'
import acornStage3 from 'acorn-stage3'
import acornJsx from 'acorn-jsx'
import moize from 'moize'

import { normalizeTokens } from './tokens.js'

const parse = function(
  code,
  { next, jsx, comments, tokens, sourceType, loose, locations, parens, source },
) {
  const acornParser = mAddPlugins(next, jsx)

  const parseOpts = getParseOpts({
    sourceType,
    loose,
    locations,
    parens,
    next,
    source,
  })

  const { allComments, allTokens, onceOpts } = getOnceState({
    comments,
    tokens,
  })

  const node = acornParser.parse(code, { ...parseOpts, ...onceOpts })

  return {
    ...node,
    ...addComments(allComments),
    ...normalizeTokens('onToken', allTokens),
  }
}

export const acorn = {
  id: 'acorn',
  title: 'Acorn',
  syntaxes: ['jsx'],
  parse,
}

const addPlugins = function(next, jsx) {
  const plugins = [...(next ? [acornStage3] : []), ...(jsx ? [acornJsx()] : [])]

  if (plugins.length === 0) {
    return acornMain
  }

  return acornMain.Parser.extend(...plugins)
}

const mAddPlugins = moize(addPlugins)

const getParseOpts = function({
  sourceType,
  loose,
  locations,
  parens,
  next,
  source,
}) {
  return {
    sourceType,
    // eslint-disable-next-line id-length
    allowReturnOutsideFunction: loose,
    // eslint-disable-next-line id-length
    allowAwaitOutsideFunction: loose,
    // eslint-disable-next-line id-length
    allowImportExportEverywhere: loose,
    allowReserved: loose,
    locations,
    ranges: locations,
    preserveParens: parens,
    ...(next ? { ecmaVersion: 2020 } : {}),
    allowHashBang: true,
    sourceFile: source,
  }
}

const getOnceState = function({ comments, tokens }) {
  const allComments = comments ? [] : undefined
  const allTokens = tokens ? [] : undefined
  const onceOpts = getOnceOpts({ allComments, allTokens })
  return { allComments, allTokens, onceOpts }
}

const getOnceOpts = function({ allComments, allTokens }) {
  return {
    ...(allComments === undefined ? {} : { onComment: allComments }),
    ...(allTokens === undefined ? {} : { onToken: allTokens }),
  }
}

const addComments = function(allComments) {
  if (allComments === undefined) {
    return
  }

  return { onComment: allComments }
}
