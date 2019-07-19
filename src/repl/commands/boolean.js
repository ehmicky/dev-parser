// Boolean attributes are toggled by their REPL command
const action = function({ parseOpts, name }) {
  // eslint-disable-next-line no-param-reassign, fp/no-mutation
  parseOpts[name] = !parseOpts[name]

  // eslint-disable-next-line no-console, no-restricted-globals
  console.log(`Option '${name}' -> ${parseOpts[name]}`)
}

const commands = [
  {
    name: 'legacy',
    help: "Toggle option 'legacy': reject recent JavaScript features",
  },
  {
    name: 'script',
    help: "Toggle option 'script': do not use ES modules syntax",
  },
  {
    name: 'loose',
    help: "Toggle option 'loose': allow code to contain small mistakes",
  },
  {
    name: 'strict',
    help: "Toggle option 'strict': use strict mode",
  },
  {
    name: 'top',
    help: "Toggle option 'top': show top-level AST node",
  },
  {
    name: 'locations',
    help: "Toggle option 'locations': show AST nodes locations",
  },
  {
    name: 'comments',
    help: "Toggle option 'comments': show AST nodes for comments",
  },
  {
    name: 'tokens',
    help: "Toggle option 'tokens': show low-level tokens",
  },
  {
    name: 'parens',
    help: "Toggle option 'parens': show AST nodes for parenthesized expresions",
  },
  {
    name: 'typescript',
    help: "Toggle option 'typescript': allow TypeScript",
  },
  {
    name: 'flow',
    help: "Toggle option 'flow': allow Flow",
  },
  {
    name: 'jsx',
    help: "Toggle option 'jsx': allow JSX",
  },
]

export const BOOLEAN_GROUP = { action, commands }
