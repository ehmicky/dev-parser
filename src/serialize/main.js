import { magentaBright } from 'chalk'
import { stdout as supportsColor } from 'supports-color'

import { serializeNode } from './node.js'

// Serialize AST nodes so they can be printed on the console
export const serialize = function(results) {
  const showHeader = results.length !== 1

  return results.map(result => serializeResult(result, showHeader)).join('\n\n')
}

const serializeResult = function({ title, node, error }, showHeader) {
  const header = getHeader(title, showHeader)
  const content = serializeContent(node, error)
  return `${header}${content}`
}

// Retrieve header showing each parser's name
const getHeader = function(title, showHeader) {
  // When there's only one parser, we do not show its name
  if (!showHeader) {
    return ''
  }

  if (!supportsColor) {
    return `[${title}]\n`
  }

  const header = magentaBright.inverse.bold(` ${title} `)
  return `${header}\n`
}

// Serialize AST node or thrown error produced by each parser
const serializeContent = function(node, error) {
  if (error) {
    return String(error)
  }

  return serializeNode(node)
}
