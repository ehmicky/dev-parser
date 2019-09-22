import { getChalk } from '../print/colors.js'

// REPL prompt
export const getPrompt = function({ colors }) {
  const chalk = getChalk(colors)
  return chalk.yellow.bold(PROMPT)
}

const PROMPT = '==> '
