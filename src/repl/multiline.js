// Can do multiline input by ending lines with a backslash
export const isMultiline = function(command) {
  return command[command.length - 1] === '\\'
}

export const handleMultiline = function(command) {
  return command.replace(MULTILINE_REGEXP, '')
}

const MULTILINE_REGEXP = /\\\s*$/gmu
