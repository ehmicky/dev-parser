// Normalize options and assign default values
export const getOpts = function(opts = {}) {
  const optsA = { ...DEFAULT_OPTS, ...opts }
  const optsB = setForcedOpts({ opts: optsA })
  const optsC = addSourceType(optsB)
  return optsC
}

const DEFAULT_OPTS = {
  legacy: false,
  script: false,
  loose: false,
  strict: false,
  top: false,
  sort: false,
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
    // Flow is incompatible with TypeScript
    flow: flow && !typescript,
    // Comments and tokens are usually set on the top-level, so they require
    // the `top` option to be `true`
    top: top || comments || tokens,
  }
}

const addSourceType = function({ script, ...opts }) {
  const sourceType = script ? 'script' : 'module'
  return { ...opts, sourceType }
}
