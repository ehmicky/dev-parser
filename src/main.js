#!/usr/bin/env node

import { argv } from 'process'

import { getParsers, callParsers } from './parse.js'
import { printResults } from './print/main.js'

// Parse JavaScript code with several parsers and print the produced AST on
// the console
export const print = function(code, { colors, ...opts } = {}) {
  const results = parse(code, opts)
  printResults(results, { colors })
}

// Parse JavaScript code with several parsers
export const parse = function(
  code,
  { parsers: allowedParsers, ...parserOpts } = {},
) {
  const parsers = getParsers({ allowedParsers, parserOpts })
  const results = callParsers({ parsers, code, parserOpts })
  return results
}

print(argv[2], {})
