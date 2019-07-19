#!/usr/bin/env node
import { exit } from 'process'

import { print, repl } from '../main.js'

import { defineCli } from './top.js'
import { parseOpts } from './parse.js'

// Parse CLI arguments then run tasks
const runCli = async function() {
  try {
    const yargs = defineCli()
    const { code, opts } = parseOpts(yargs)

    await runCommand(code, opts)
  } catch (error) {
    runCliHandler(error)
  }
}

const runCommand = async function(code, opts) {
  if (code === undefined) {
    await repl(opts)
    return
  }

  print(String(code), opts)
}

// If an error is thrown, print error's description, then exit with exit code 1
const runCliHandler = function({ message }) {
  console.error(message)

  exit(1)
}

runCli()
