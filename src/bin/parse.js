import { excludeKeys } from 'filter-obj'

export const parseOpts = function (yargs) {
  const {
    _: [code],
    parser: parsers,
    ...opts
  } = yargs.parse()

  const optsA = { ...opts, parsers }
  const optsB = excludeKeys(optsA, isInternalOpt)
  return { code, opts: optsB }
}

// Remove `yargs`-specific options, shortcuts and dash-cased
const isInternalOpt = function (key, value) {
  return (
    value === undefined ||
    INTERNAL_KEYS.has(key) ||
    key.length === 1 ||
    key.includes('-')
  )
}

const INTERNAL_KEYS = new Set(['help', 'version', '_', '$0'])
