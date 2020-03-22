import filterObj from 'filter-obj'

export const parseOpts = function (yargs) {
  const {
    _: [code],
    parser: parsers,
    ...opts
  } = yargs.parse()

  const optsA = { ...opts, parsers }
  const optsB = filterObj(optsA, isUserOpt)
  return { code, opts: optsB }
}

// Remove `yargs`-specific options, shortcuts and dash-cased
const isUserOpt = function (key, value) {
  return (
    value !== undefined &&
    !INTERNAL_KEYS.has(key) &&
    key.length !== 1 &&
    !key.includes('-')
  )
}

const INTERNAL_KEYS = new Set(['help', 'version', '_', '$0'])
