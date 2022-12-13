// Can do multiline input by ending lines with a backslash
export const isMultiline = (command) => command[command.length - 1] === '\\'

export const handleMultiline = (command) =>
  command.replace(MULTILINE_REGEXP, '')

const MULTILINE_REGEXP = /\\\s*$/gmu
