import { start, Recoverable } from 'repl'

import { parse } from '../parse/main.js'
import { serialize } from '../print/main.js'

import { defineCommands } from './commands/main.js'
import { setupHistory } from './history.js'
import { isMultiline, handleMultiline } from './multiline.js'
import { getOpts } from './options.js'
import { getPrompt } from './prompt.js'

// Starts a REPL that parses JavaScript code as input and prints their AST
export const repl = async function (opts) {
  const { history, parseOpts, serializeOpts } = getOpts(opts)

  const replServer = start({
    prompt: getPrompt(serializeOpts),
    eval: evalCode.bind(undefined, parseOpts),
    writer: serializeCode.bind(undefined, serializeOpts),
    ignoreUndefined: true,
    // Like Node REPL
    historySize: 1e3,
  })

  defineCommands(replServer, parseOpts)

  await setupHistory(replServer, history)

  return replServer
}

// eslint-disable-next-line max-params
const evalCode = function (parseOpts, code, context, filename, func) {
  // Entering nothing should be noop
  if (code.trim() === '') {
    // eslint-disable-next-line unicorn/no-null
    return func(null)
  }

  // Remove trailing newline
  const codeA = code.slice(0, -1)

  if (isMultiline(codeA)) {
    return func(new Recoverable(''))
  }

  const codeB = handleMultiline(codeA)

  // Parse JavaScript code to AST nodes
  const results = parse(codeB, parseOpts)

  // When there are no `parsers`
  if (results.length === 0) {
    // eslint-disable-next-line unicorn/no-null
    return func(null)
  }

  // eslint-disable-next-line unicorn/no-null
  func(null, results)
}

// Serialize AST resuls
const serializeCode = function (serializeOpts, results) {
  return serialize(results, serializeOpts)
}
