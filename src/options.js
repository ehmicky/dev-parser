export const getOpts = function({ parsers, ...parserOpts } = {}) {
  const { top, ...parserOptsA } = { ...DEFAULT_OPTS, ...parserOpts }
  const parserOptsB = fixFlow({ parserOpts: parserOptsA })
  const parserOptsC = addSourceType(parserOptsB)
  return { parsers, top, parserOpts: parserOptsC }
}

const DEFAULT_OPTS = {
  top: false,

  next: true,
  script: false,
  loose: false,
  strict: false,
  locations: false,
  parens: false,
  comments: false,
  tokens: false,

  typescript: false,
  flow: false,
  jsx: false,
}

const fixFlow = function({ parserOpts, parserOpts: { flow, typescript } }) {
  if (!flow || !typescript) {
    return parserOpts
  }

  return { ...parserOpts, flow: false }
}

const addSourceType = function({ script, ...parserOpts }) {
  const sourceType = script ? 'script' : 'module'
  return { ...parserOpts, sourceType }
}
