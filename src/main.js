#!/usr/bin/env node

const {
  argv: [, , string],
} = require('process')
const { inspect } = require('util')

const esprima = require('esprima')
const acorn = require('acorn')
const acornStage3 = require('acorn-stage3')
const acornJsx = require('acorn-jsx')
const espree = require('espree')
const typescriptEstree = require('@typescript-eslint/typescript-estree')
const meriyah = require('meriyah')
const babel = require('@babel/parser')
const { magentaBright } = require('chalk')
const supportsColor = require('supports-color')

const parseAll = function(
  string,
  {
    parsers,
    next = true,
    top = false,
    module = true,
    lenient = false,
    strict = false,
    locations = false,
    preserveParens = false,
    comment = false,
    typescript = false,
    flow = false,
    jsx = false,
    tokens = false,
    source,
  } = {},
) {
  const modes = getModes({ typescript, flow, jsx })
  const parsersA = getParsers({
    parsers,
    modes,
    next,
    module,
    lenient,
    strict,
    locations,
    preserveParens,
    comment,
    jsx,
    tokens,
    source,
  })
  const singleParser = parsersA.length === 1
  const output = parsersA
    .map(({ name, parse, parseOpts }) =>
      printParse({
        name,
        parse,
        parseOpts,
        string,
        top,
        locations,
        singleParser,
      }),
    )
    .join('\n\n')
  console.log(output)
}

const getModes = function({ typescript, flow, jsx }) {
  const flowA = flow && !typescript
  return { typescript, flow: flowA, jsx }
}

const getParsers = function({
  parsers,
  modes,
  next,
  module,
  lenient,
  strict,
  preserveParens,
  locations,
  comment,
  jsx,
  tokens,
  source,
}) {
  const sourceType = module ? 'module' : 'script'

  const babelPlugins = [
    ...(modes.typescript ? ['typescript'] : []),
    ...(modes.flow ? ['flow', 'flowComments'] : []),
    ...(modes.jsx ? ['jsx'] : []),
    ...(next ? BABEL_NEXT_PLUGINS : []),
  ]

  const acornComments = []
  const acornTokens = []

  return [
    {
      id: 'esprima',
      name: 'Esprima',
      parse: esprima.parse,
      parseOpts: {
        sourceType,
        tolerant: lenient,
        loc: locations,
        range: locations,
        comment,
        jsx: modes.jsx,
        tokens,
      },
      jsx: true,
    },
    {
      id: 'acorn',
      name: 'Acorn',
      parse: parseAcorn.bind(null, {
        next,
        jsx,
        comment,
        tokens,
        acornComments,
        acornTokens,
      }),
      parseOpts: {
        sourceType,
        allowReturnOutsideFunction: lenient,
        allowAwaitOutsideFunction: lenient,
        allowImportExportEverywhere: lenient,
        allowReserved: lenient,
        locations,
        ranges: locations,
        ...(comment ? { onComment: acornComments } : {}),
        preserveParens,
        ...(next ? { ecmaVersion: 2020 } : {}),
        allowHashBang: true,
        ...(tokens ? { onToken: acornTokens } : {}),
        sourceFile: source,
      },
      jsx: true,
    },
    {
      id: 'espree',
      name: 'Espree',
      parse: espree.parse,
      parseOpts: {
        sourceType: next ? sourceType : 'script',
        loc: locations,
        range: locations,
        comment,
        ...(next ? { ecmaVersion: 2019 } : {}),
        ecmaFeatures: {
          globalReturn: lenient,
          impliedStrict: strict,
          jsx: modes.jsx,
        },
        tokens,
      },
      jsx: true,
    },
    {
      id: 'typescript-estree',
      name: 'TypeScript-ESTree',
      parse: typescriptEstree.parse,
      parseOpts: {
        errorOnUnknownASTType: lenient,
        loc: locations,
        range: locations,
        comment,
        jsx: modes.jsx,
        useJSXTextNode: modes.jsx,
        tokens,
      },
      typescript: true,
      jsx: true,
    },
    {
      id: 'meriyah',
      name: 'Meriyah',
      parse: meriyah.parse,
      parseOpts: {
        module,
        globalReturn: lenient,
        specDeviation: lenient,
        impliedStrict: strict,
        loc: locations,
        ranges: locations,
        preserveParens,
        raw: true,
        directives: true,
        next,
        jsx: modes.jsx,
        source,
      },
      jsx: true,
    },
    {
      id: 'babel',
      name: 'Babel',
      parse: parseBabel,
      parseOpts: {
        sourceType,
        allowReturnOutsideFunction: lenient,
        allowAwaitOutsideFunction: lenient,
        allowSuperOutsideFunction: lenient,
        allowImportExportEverywhere: lenient,
        strictMode: strict,
        plugins: babelPlugins,
        ranges: locations,
        tokens,
        sourceFilename: source,
      },
      typescript: true,
      flow: true,
      jsx: true,
    },
    {
      id: 'babel-estree',
      name: 'Babel-ESTree',
      parse: parseBabel,
      parseOpts: {
        sourceType,
        allowReturnOutsideFunction: lenient,
        allowAwaitOutsideFunction: lenient,
        allowSuperOutsideFunction: lenient,
        allowImportExportEverywhere: lenient,
        strictMode: strict,
        plugins: ['estree', ...babelPlugins],
        ranges: locations,
        tokens,
        sourceFilename: source,
      },
      typescript: true,
      flow: true,
      jsx: true,
    },
  ].filter(parser => includeParser({ parser, parsers, modes }))
}

const BABEL_NEXT_PLUGINS = [
  // Always included:
  // 'asyncGenerators',
  // 'objectRestSpread',
  // 'optionalCatchBinding',

  'bigInt',
  'classProperties',
  'classPrivateProperties',
  'classPrivateMethods',
  'decorators-legacy',
  'doExpressions',
  'dynamicImport',
  'exportDefaultFrom',
  'exportNamespaceFrom',
  'functionBind',
  'functionSent',
  'importMeta',
  'logicalAssignment',
  'nullishCoalescingOperator',
  'numericSeparator',
  'optionalChaining',
  'partialApplication',
  ['pipelineOperator', { proposal: 'smart' }],
  'throwExpressions',
]

const parseAcorn = function(
  { next, jsx, comment, tokens, acornComments, acornTokens },
  code,
  opts,
) {
  const acornA = patchAcorn({ next, jsx })

  const node = acornA.parse(code, opts)

  return {
    ...node,
    ...(comment ? { onComment: acornComments } : {}),
    ...(tokens ? { onToken: acornTokens.map(normalizeToken) } : {}),
  }
}

const patchAcorn = function({ next, jsx }) {
  const plugins = [...(next ? [acornStage3] : []), ...(jsx ? [acornJsx()] : [])]

  if (plugins.length === 0) {
    return acorn
  }

  return acorn.Parser.extend(...plugins)
}

const parseBabel = function(code, opts) {
  const node = babel.parse(code, opts)

  return {
    ...node,
    ...(node.tokens ? { tokens: node.tokens.map(normalizeToken) } : {}),
  }
}

const normalizeToken = function({ type: { label: type }, value }) {
  if (value === undefined) {
    return { type }
  }

  return { type, value }
}

const includeParser = function({ parser, parsers, modes }) {
  return isIncluded(parser, parsers) && supportsModes(parser, modes)
}

const isIncluded = function({ id }, parsers) {
  return parsers === undefined || parsers.includes(id)
}

const supportsModes = function(parser, modes) {
  return Object.entries(modes).every(([mode, value]) => !value || parser[mode])
}

const printParse = function({
  name,
  parse,
  parseOpts,
  string,
  top,
  locations,
  singleParser,
}) {
  const header = getHeader({ name, singleParser })
  const value = parseValue({ parse, parseOpts, string, top, locations })
  return `${header}${value}`
}

const getHeader = function({ name, singleParser }) {
  if (singleParser) {
    return ''
  }

  return `${magentaBright.inverse.bold(` ${name} `)}\n`
}

const parseValue = function({ parse, parseOpts, string, top, locations }) {
  const value = parseString({ parse, parseOpts, string })

  if (value.error) {
    return serializeError(value.error)
  }

  const topNode = getTopNode(value, { top })
  const result = print(topNode, { locations })
  return result
}

const parseString = function({ parse, parseOpts, string }) {
  try {
    return parse(string, parseOpts)
  } catch (error) {
    return { error }
  }
}

// typescript-estree errors do not have names
const serializeError = function({ name = 'Error', message }) {
  return `${name}: ${message}`
}

const getTopNode = function(value, { top }) {
  if (top) {
    return value
  }

  if (value.program !== undefined) {
    return value.program.body
  }

  return value.body
}

const print = function(value, { locations }) {
  const valueA = cleanValue(value, { locations })
  const valueB = inspect(valueA, INSPECT_OPTS)
  return valueB
    .replace(START_DELIMITER_REGEXP, '')
    .replace(END_DELIMITER_REGEXP, '')
    .replace(INDENTATION_REGEXP, '')
}

// Opening/closing { or [ are omitted
const START_DELIMITER_REGEXP = /^[{[][\n ]/u
const END_DELIMITER_REGEXP = /[\n ][}\]]$/u
// Initial indentation is removed
const INDENTATION_REGEXP = /^ {2}/gmu

const INSPECT_OPTS = {
  depth: null,
  maxArrayLength: null,
  colors: supportsColor.stdout,
}

const cleanValue = function(value, cleanOpts) {
  if (Array.isArray(value)) {
    return value.map(child => cleanValue(child, cleanOpts))
  }

  if (typeof value !== 'object' || value === null) {
    return value
  }

  const object = removeLocations(value, cleanOpts)

  const objectA = Object.keys(object)
    .sort(sortKeys)
    .map(key => [key, cleanValue(object[key], cleanOpts)])
    .filter(isDefinedChild)
  const objectB = Object.fromEntries(objectA)
  return objectB
}

const sortKeys = function(keyA, keyB) {
  if (keyA === 'type') {
    return -1
  }

  if (keyB === 'type') {
    return 1
  }

  const cleanIndex = sortCleanAttr(keyA, keyB)

  if (cleanIndex !== undefined) {
    return cleanIndex
  }

  if (keyA > keyB) {
    return 1
  }

  return -1
}

const sortCleanAttr = function(keyA, keyB) {
  const cleanIndexA = LOCATION_ATTRS.indexOf(keyA)
  const cleanIndexB = LOCATION_ATTRS.indexOf(keyB)

  if (cleanIndexA === -1 && cleanIndexB === -1) {
    return
  }

  if (cleanIndexA === -1) {
    return -1
  }

  if (cleanIndexB === -1) {
    return 1
  }

  if (cleanIndexA > cleanIndexB) {
    return 1
  }

  return -1
}

const isDefinedChild = function([, child]) {
  return child !== undefined
}

const removeLocations = function(object, { locations }) {
  if (locations) {
    return object
  }

  return Object.fromEntries(Object.entries(object).filter(isNotLocation))
}

const isNotLocation = function([key]) {
  return !LOCATION_ATTRS.includes(key)
}

const LOCATION_ATTRS = ['start', 'end', 'loc', 'range']

parseAll(string, {})
