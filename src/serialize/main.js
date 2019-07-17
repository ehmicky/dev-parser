import { magentaBright } from 'chalk'
import { stdout as supportsColor } from 'supports-color'

import { serializeNode } from './node.js'

export const serialize = function(results) {
  const showHeader = results.length !== 1

  return results.map(result => serializeResult(result, showHeader)).join('\n\n')
}

const serializeResult = function({ title, node, error }, showHeader) {
  const header = getHeader(title, showHeader)
  const content = serializeContent(node, error)
  return `${header}${content}`
}

const getHeader = function(title, showHeader) {
  if (!showHeader) {
    return ''
  }

  if (!supportsColor) {
    return `[${title}]\n`
  }

  const header = magentaBright.inverse.bold(` ${title} `)
  return `${header}\n`
}

const serializeContent = function(node, error) {
  if (error) {
    return String(error)
  }

  return serializeNode(node)
}
