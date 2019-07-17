#!/usr/bin/env node

import { argv } from 'process'

import { callParsers } from './parse.js'
import { serialize } from './serialize/main.js'

// Parse JavaScript code with several parsers and print the produced AST on
// the console
const parseAll = function(
  code,
  { parsers: allowedParsers, colors, ...parserOpts } = {},
) {
  const results = callParsers({ code, allowedParsers, parserOpts })

  const output = serialize(results, { colors })
  // eslint-disable-next-line no-restricted-globals, no-console
  console.log(output)
}

parseAll(argv[2], {})
