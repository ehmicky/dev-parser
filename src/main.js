#!/usr/bin/env node

import { argv } from 'process'

import { getOpts } from './options.js'
import { callParsers } from './parse.js'
import { serialize } from './serialize/main.js'

const parseAll = function(code, opts) {
  const { allowedParsers, parserOpts } = getOpts(opts)

  const results = callParsers({ code, allowedParsers, parserOpts })

  const output = serialize(results)
  // eslint-disable-next-line no-restricted-globals, no-console
  console.log(output)
}

parseAll(argv[2], {})
