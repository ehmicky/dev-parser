import acornMain from 'acorn'
import acornStage3 from 'acorn-stage3'
import acornJsx from 'acorn-jsx'
import moize from 'moize'

import { normalizeTokens } from './tokens.js'

const parse = function(
  code,
  {
    next,
    jsx,
    comment,
    tokens,
    sourceType,
    lenient,
    locations,
    preserveParens,
    source,
  },
) {
  const acornParser = mAddPlugins(next, jsx)

  const parseOpts = getParseOpts({
    sourceType,
    lenient,
    locations,
    preserveParens,
    next,
    source,
  })

  const { comments, tokenObjects, onceOpts } = getOnceState({ comment, tokens })

  const result = acornParser.parse(code, { ...parseOpts, ...onceOpts })

  return {
    ...result,
    ...addComments(comments),
    ...normalizeTokens('onToken', tokenObjects),
  }
}

export const acorn = {
  id: 'acorn',
  name: 'Acorn',
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
  lenient,
  locations,
  preserveParens,
  next,
  source,
}) {
  return {
    sourceType,
    // eslint-disable-next-line id-length
    allowReturnOutsideFunction: lenient,
    // eslint-disable-next-line id-length
    allowAwaitOutsideFunction: lenient,
    // eslint-disable-next-line id-length
    allowImportExportEverywhere: lenient,
    allowReserved: lenient,
    locations,
    ranges: locations,
    preserveParens,
    ...(next ? { ecmaVersion: 2020 } : {}),
    allowHashBang: true,
    sourceFile: source,
  }
}

const getOnceState = function({ comment, tokens }) {
  const comments = comment ? [] : undefined
  const tokenObjects = tokens ? [] : undefined
  const onceOpts = getOnceOpts({ comments, tokenObjects })
  return { comments, tokenObjects, onceOpts }
}

const getOnceOpts = function({ comments, tokenObjects }) {
  return {
    ...(comments === undefined ? {} : { onComment: comments }),
    ...(tokenObjects === undefined ? {} : { onToken: tokenObjects }),
  }
}

const addComments = function(comments) {
  if (comments === undefined) {
    return
  }

  return { onComment: comments }
}
