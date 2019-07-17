export const getOpts = function(opts = {}) {
  const optsA = { ...DEFAULT_OPTS, ...opts }
  const optsB = setForcedOpts({ opts: optsA })
  const { parsers, top, ...parserOpts } = addSourceType(optsB)
  return { allowedParsers: parsers, top, parserOpts }
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

const setForcedOpts = function({
  opts,
  opts: { flow, typescript, top, comments, tokens },
}) {
  return {
    ...opts,
    flow: flow && !typescript,
    top: top || comments || tokens,
  }
}

const addSourceType = function({ script, ...opts }) {
  const sourceType = script ? 'script' : 'module'
  return { ...opts, sourceType }
}
