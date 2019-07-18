import { start, Recoverable } from 'repl'
import { homedir } from 'os'
import { promisify } from 'util'

import { compute } from './print/main.js'
import { getChalk } from './print/colors.js'

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

const getPrompt = function({ colors }) {
  const chalk = getChalk(colors)

  if (chalk === undefined) {
    return PROMPT
  }

  return chalk.yellow.bold(PROMPT)
}

const PROMPT = '==> '

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

// Can do multiline input by ending lines with a backslash
const isMultiline = function(command) {
  return command[command.length - 1] === '\\'
}

const handleMultiline = function(command) {
  return command.replace(MULTILINE_REGEXP, '')
}

const MULTILINE_REGEXP = /\\\s*$/gmu

const setupHistory = async function(replServer, history) {
  // Like Node REPL
  // eslint-disable-next-line fp/no-mutation, no-param-reassign
  replServer.removeHistoryDuplicates = true

  if (!history) {
    return
  }

  await promisify(replServer.setupHistory.bind(replServer))(history)
}

const DEFAULT_HISTORY = `${homedir}/.dev_parser_repl_history`
