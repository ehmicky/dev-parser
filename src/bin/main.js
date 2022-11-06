#!/usr/bin/env node
import { dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

import handleCliError from 'handle-cli-error'
import { readPackageUp } from 'read-pkg-up'
import UpdateNotifier from 'update-notifier'

import { print, repl } from '../main.js'

import { parseOpts } from './parse.js'
import { defineCli } from './top.js'

// Parse CLI arguments then run tasks
const runCli = async function () {
  try {
    await checkUpdate()

    const yargs = defineCli()
    const { code, opts } = parseOpts(yargs)

    await runCommand(code, opts)
  } catch (error) {
    handleCliError(error)
  }
}

// TODO: use static JSON imports once those are possible
const checkUpdate = async function () {
  const cwd = dirname(fileURLToPath(import.meta.url))
  const { packageJson } = await readPackageUp({ cwd, normalize: false })
  UpdateNotifier({ pkg: packageJson }).notify()
}

const runCommand = async function (code, opts) {
  if (code === undefined) {
    await repl(opts)
    return
  }

  print(String(code), opts)
}

runCli()
