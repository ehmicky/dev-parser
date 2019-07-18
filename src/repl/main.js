import { start, Recoverable } from 'repl'

import { compute } from '../print/main.js'

import { getPrompt } from './prompt.js'
import { isMultiline, handleMultiline } from './multiline.js'
import { DEFAULT_HISTORY, setupHistory } from './history.js'

// Starts a REPL that parses JavaScript code as input and prints their AST
export const repl = async function({
  history = DEFAULT_HISTORY,
  ...opts
} = {}) {
  const replServer = start({
    ...REPL_OPTS,
    prompt: getPrompt(opts),
    eval: evalCode.bind(null, opts),
  })

  await setupHistory(replServer, history)

  return replServer
}

// We already serialized output
const writer = function(output) {
  return output
}

const REPL_OPTS = {
  writer,
  ignoreUndefined: true,
  // Like Node REPL
  historySize: 1e3,
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

  // Parse JavaScript code to AST and serialize it
  const output = compute(codeB, opts)
  const outputA = `\n${output}\n`

  func(null, outputA)
}
