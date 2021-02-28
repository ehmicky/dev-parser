import colorsOption from 'colors-option'

import { parse } from '../parse/main.js'

import { serializeNode } from './node.js'
import { getOpts } from './options.js'

// Parse JavaScript code with several parsers and print the produced AST on
// the console
export const print = function (code, opts) {
  const { colors, parseOpts } = getOpts(opts)

  const results = parse(code, parseOpts)

  // When there are no `parsers`
  if (results.length === 0) {
    return
  }

  const output = serialize(results, { colors })
  // eslint-disable-next-line no-restricted-globals, no-console
  console.log(output)
}

// Serialize AST nodes so they can be printed on the console
export const serialize = function (results, { colors }) {
  const showHeader = results.length !== 1
  const chalk = colorsOption({ colors })

  const output = results
    .map((result) => serializeResult(result, { showHeader, chalk }))
    .join('\n\n')
  return `\n${output}\n`
}

const serializeResult = function (
  { title, node, error },
  { showHeader, chalk },
) {
  const header = getHeader({ title, showHeader, chalk })
  const content = serializeContent({ node, error, chalk })
  return `${header}${content}`
}

// Retrieve header showing each parser's name
const getHeader = function ({ title, showHeader, chalk }) {
  // When there's only one parser, we do not show its name
  if (!showHeader) {
    return ''
  }

  if (chalk === undefined) {
    return `[${title}]\n`
  }

  const header = chalk.magentaBright.inverse.bold(` ${title} `)
  return `${header}\n`
}

// Serialize AST node or thrown error produced by each parser
const serializeContent = function ({ node, error, chalk }) {
  if (error) {
    return String(error)
  }

  return serializeNode(node, { chalk })
}
