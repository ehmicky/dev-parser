export const getOpts = function({ parsers, ...parserOpts } = {}) {
  const { top, ...parserOptsA } = { ...DEFAULT_OPTS, ...parserOpts }
  const parserOptsB = fixFlow({ parserOpts: parserOptsA })
  const parserOptsC = addSourceType({ parserOpts: parserOptsB })
  return { parsers, top, parserOpts: parserOptsC }
}

const DEFAULT_OPTS = {
  top: false,

  next: true,
  // TODO: rename to `script`
  moduleOpt: true,
  // TODO: rename to `tolerant`
  lenient: false,
  strict: false,
  locations: false,
  // TODO: rename to `parens`
  preserveParens: false,
  // TODO: rename to `comments`
  comment: false,
  typescript: false,
  flow: false,
  jsx: false,
  tokens: false,
}

const fixFlow = function({ parserOpts, parserOpts: { flow, typescript } }) {
  if (!flow || !typescript) {
    return parserOpts
  }

  return { ...parserOpts, flow: false }
}

const addSourceType = function({ moduleOpt, ...parserOpts }) {
  const sourceType = moduleOpt ? 'module' : 'script'
  return { ...parserOpts, sourceType }
}
