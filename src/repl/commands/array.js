// Array attributes have one REPL command per value, which toggles that value
const action = function({ parseOpts, attr, name }) {
  // eslint-disable-next-line no-param-reassign, fp/no-mutation
  parseOpts[attr] = [name]

  // eslint-disable-next-line no-console, no-restricted-globals
  console.log(`Option '${attr}' -> ${name}`)
}

const commands = [
  {
    attr: 'parsers',
    name: 'all',
    help: 'Toggle whether all available parsers should be used',
  },
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
    name: 'babelestree',
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
    name: 'typescriptestree',
    help: 'Toggle whether TypeScript-ESTree should be used for parsing',
  },
]

export const ARRAY_GROUP = { action, commands }
