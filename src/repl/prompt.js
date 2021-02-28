import colorsOption from 'colors-option'

// REPL prompt
export const getPrompt = function ({ colors }) {
  const chalk = colorsOption({ colors })
  return chalk.yellow.bold(PROMPT)
}

const PROMPT = '==> '
