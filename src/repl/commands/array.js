// Array attributes have one REPL command per value, which toggles that value
const action = function({ opts, attr, name }) {
  // eslint-disable-next-line no-param-reassign, fp/no-mutation
  opts[attr] = toggleValue({ opts, attr, name })

  // eslint-disable-next-line no-console, no-restricted-globals
  console.log(`Option '${attr}' -> [${opts[attr].join(', ')}]`)
}

const toggleValue = function({ opts, attr, name }) {
  if (opts[attr].includes(name)) {
    return opts[attr].filter(nameA => nameA !== name)
  }

  return [...opts[attr], name]
}

const commands = [
  {
    attr: 'parsers',
    name: 'acorn',
    help: 'Toggle whether Acorn should be used for parsing',
  },
  {
    attr: 'parsers',
    name: 'babel',
    help: 'Toggle whether Babel should be used for parsing',
  },
  {
    attr: 'parsers',
    name: 'babelEstree',
    help: 'Toggle whether Babel-ESTree should be used for parsing',
  },
  {
    attr: 'parsers',
    name: 'espree',
    help: 'Toggle whether Espree should be used for parsing',
  },
  {
    attr: 'parsers',
    name: 'esprima',
    help: 'Toggle whether Esprima should be used for parsing',
  },
  {
    attr: 'parsers',
    name: 'meriyah',
    help: 'Toggle whether Meriyah should be used for parsing',
  },
  {
    attr: 'parsers',
    name: 'typescriptEstree',
    help: 'Toggle whether TypeScript-ESTree should be used for parsing',
  },
]

export const ARRAY_GROUP = { action, commands }
