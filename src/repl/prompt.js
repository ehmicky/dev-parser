import { getChalk } from '../print/colors.js'

// REPL prompt
export const getPrompt = function({ colors }) {
  const chalk = getChalk(colors)

  if (chalk === undefined) {
    return PROMPT
  }

  return chalk.yellow.bold(PROMPT)
}

const PROMPT = '==> '
