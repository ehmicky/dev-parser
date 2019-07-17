export const getOpts = function({
  parsers: allowedParsers,
  ...parserOpts
} = {}) {
  const { top, ...parserOptsA } = { ...DEFAULT_OPTS, ...parserOpts }
  const parserOptsB = fixFlow({ parserOpts: parserOptsA })
  const parserOptsC = addSourceType(parserOptsB)
  return { allowedParsers, top, parserOpts: parserOptsC }
}

const DEFAULT_OPTS = {
  top: false,

  next: true,
  script: false,
  loose: false,
  strict: false,
  locations: false,
  comments: false,
  tokens: false,
  parens: false,

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
