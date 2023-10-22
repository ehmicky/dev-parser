// Can do multiline input by ending lines with a backslash
export const isMultiline = (command) => command.at(-1) === '\\'

export const handleMultiline = (command) =>
  command.replaceAll(MULTILINE_REGEXP, '')

const MULTILINE_REGEXP = /\\\s*$/gmu
