import { start, Recoverable } from 'repl'

import { parse } from '../parse.js'
import { serialize } from '../print/main.js'

import { getPrompt } from './prompt.js'
import { isMultiline, handleMultiline } from './multiline.js'
import { defineCommands } from './commands/main.js'
import { DEFAULT_HISTORY, setupHistory } from './history.js'

// Starts a REPL that parses JavaScript code as input and prints their AST
export const repl = async function({
  history = DEFAULT_HISTORY,
  ...opts
} = {}) {
  const optsA = { ...DEFAULT_OPTS, ...opts }

  const replServer = start({
    prompt: getPrompt(optsA),
    eval: evalCode.bind(null, optsA),
    writer: serializeCode.bind(null, optsA),
    ignoreUndefined: true,
    // Like Node REPL
    historySize: 1e3,
  })

  defineCommands(replServer, optsA)

  await setupHistory(replServer, history)

  return replServer
}

// Since we mutate options, we need to assign default values first.
// However we don't need to do this for faulty default values.
const DEFAULT_OPTS = {
  parsers: ['babel'],
}

// eslint-disable-next-line max-params
const evalCode = function(opts, code, context, filename, func) {
  // Entering nothing should be noop
  if (code.trim() === '') {
    return func(null, undefined)
  }

  // Remove trailing newline
  const codeA = code.slice(0, -1)

  if (isMultiline(codeA)) {
    return func(new Recoverable(''))
  }

  const codeB = handleMultiline(codeA)

  // Parse JavaScript code to AST nodes
  const results = parse(codeB, opts)

  func(null, results)
}

// Serialize AST resuls
const serializeCode = function(opts, results) {
  const output = serialize(results, opts)
  const outputA = `\n${output}\n`
  return outputA
}
