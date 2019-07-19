import yargs from 'yargs'

export const defineCli = function() {
  return yargs
    .options(CONFIG)
    .usage(USAGE)
    .example(REPL_EXAMPLE, 'Start an interactive session')
    .example(PRINT_EXAMPLE, 'Parse a specific code string')
    .help()
    .version()
    .strict()
}

const CONFIG = {
  parser: {
    string: true,
    array: true,
    describe: `Which parsers to use.
Can be babel (default), babelEstree, esprima, acorn, espree, meriyah, typescriptEstree or all.
Several parsers can be used at once.
Default: babel`,
    requiresArg: true,
    alias: 'p',
  },
  typescript: {
    boolean: true,
    describe: `Allow TypeScript.
Only supported by babel, babelEstree and typescriptEstree.
Default: false`,
  },
  flow: {
    boolean: true,
    describe: `Allow Flow.
Only supported by babel and babelEstree.
Default: false`,
  },
  jsx: {
    boolean: true,
    describe: `Allow JSX.
Default: false`,
  },
  legacy: {
    boolean: true,
    describe: `Reject recent JavaScript features.
Each parser handles differently which JavaScript features are considered recent.
Default: false`,
  },
  script: {
    boolean: true,
    describe: `Do not use ES modules syntax.
Not supported by typescriptEstree.
Default: false`,
  },
  loose: {
    boolean: true,
    describe: `Allow small mistakes in code.
Default: false`,
  },
  strict: {
    boolean: true,
    describe: `Use strict mode.
Only supported by babel, babelEstree, espree and meriyah.
Default: false`,
  },
  top: {
    boolean: true,
    describe: `Show top-level AST node.
Default: false`,
  },
  locations: {
    boolean: true,
    describe: `Show AST nodes locations.
Default: false`,
  },
  comments: {
    boolean: true,
    describe: `Show AST nodes for comments.
Not supported by Meriyah.
Default: false`,
  },
  tokens: {
    boolean: true,
    describe: `Show low-level tokens.
Not supported by Meriyah.
Default: false`,
  },
  parens: {
    boolean: true,
    describe: `Show AST nodes for parenthesized expressions.
Only supported by babel, babelEstree and acorn.
Default: false`,
  },
  source: {
    string: true,
    requiresArg: true,
    describe: `Pass a filename to show in AST nodes.
The 'locations' option should be used as well.
Only supported by babel, babelEstree, acorn and meriyah.`,
  },
  history: {
    string: true,
    requiresArg: true,
    describe: `Path to a file saving previous inputs.
Can be disabled by passing an empty string.
Default: ~/.dev_parser_repl_history`,
  },
  colors: {
    boolean: true,
    describe: `Enable colors.
Default: true if the terminal supports colors`,
  },
}

const USAGE = `$0 [OPTIONS] ['CODE']

Parses JavaScript CODE and prints the AST nodes.

Starts a REPL unless 'CODE' is specified.

Options can be toggled from the REPL by entering a dot followed by the option
name. For example:
  - .acorn toggles using Acorn
  - .comments toggles comments parsing`

const REPL_EXAMPLE = '$0'
const PRINT_EXAMPLE = "$0 '1 + 1'"
