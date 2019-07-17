import { magentaBright } from 'chalk'
import { stdout as supportsColor } from 'supports-color'

import { serializeNode } from './node.js'

export const serialize = function(results) {
  const showHeader = results.length !== 1

  return results.map(result => serializeResult(result, showHeader)).join('\n\n')
}

const serializeResult = function({ name, node, error }, showHeader) {
  const header = getHeader(name, showHeader)
  const content = serializeContent(node, error)
  return `${header}${content}`
}

const getHeader = function(name, showHeader) {
  if (!showHeader) {
    return ''
  }

  if (!supportsColor) {
    return `[${name}]\n`
  }

  const header = magentaBright.inverse.bold(` ${name} `)
  return `${header}\n`
}

const serializeContent = function(node, error) {
  if (error) {
    return String(error)
  }

  return serializeNode(node)
}
