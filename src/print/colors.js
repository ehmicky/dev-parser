import Chalk from 'chalk'
import { stdout as supportsColor } from 'supports-color'

export const getChalk = function(colors = supportsColor) {
  if (!colors) {
    return
  }

  // When `stdout` does not support color, Chalk ignore the `enabled` option
  // unless a `level` is set
  const level = supportsColor ? {} : { level: 2 }
  return new Chalk.constructor({ enabled: colors, ...level })
}
