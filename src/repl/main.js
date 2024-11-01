// eslint-disable-next-line n/no-deprecated-api
import { Recoverable, start } from 'node:repl'

import { parse } from '../parse/main.js'
import { serialize } from '../print/main.js'

import { defineCommands } from './commands/main.js'
import { setupHistory } from './history.js'
import { handleMultiline, isMultiline } from './multiline.js'
import { getOpts } from './options.js'

// Starts a REPL that parses JavaScript code as input and prints their AST
export const repl = async (opts) => {
  const { history, parseOpts, serializeOpts } = getOpts(opts)

  const replServer = start({
    prompt: PROMPT,
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

// REPL prompt
const PROMPT = '> '

// eslint-disable-next-line max-params
const evalCode = (parseOpts, code, context, filename, func) => {
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

// Serialize AST results
const serializeCode = (serializeOpts, results) =>
  serialize(results, serializeOpts)
