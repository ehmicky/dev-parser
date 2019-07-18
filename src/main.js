#!/usr/bin/env node

import { argv } from 'process'

import { getParsers, callParsers } from './parse.js'
import { printResults } from './print/main.js'

// Parse JavaScript code with several parsers and print the produced AST on
// the console
const parse = function(
  code,
  { parsers: allowedParsers, colors, print = false, ...parserOpts } = {},
) {
  const parsers = getParsers({ allowedParsers, parserOpts })

  const results = callParsers({ parsers, code, parserOpts })

  printResults(results, { colors, print })

  return results
}

parse(argv[2], { print: true })
