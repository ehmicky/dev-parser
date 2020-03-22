import Chalk from 'chalk'
import { stdout as supportsColor } from 'supports-color'

export const getChalk = function (colors) {
  const level = getLevel(colors)
  return new Chalk.Instance({ level })
}

const getLevel = function (colors) {
  if (!colors) {
    return 0
  }

  return Math.max(supportsColor.level, 1)
}

export const DEFAULT_COLORS = Boolean(supportsColor)
