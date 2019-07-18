import { ARRAY_COMMANDS } from './array.js'
import { BOOLEAN_COMMANDS } from './boolean.js'

// Define REPL commands starting with dots.
// They are used to modify the current options.
export const defineCommands = function(replServer, opts) {
  ARRAY_COMMANDS.forEach(({ attr, value, help }) =>
    defineArray({ replServer, opts, attr, value, help }),
  )

  BOOLEAN_COMMANDS.forEach(({ attr, help }) =>
    defineBoolean({ replServer, opts, attr, help }),
  )
}

const defineArray = function({ replServer, opts, attr, value, help }) {}

// This only works when the boolean option default to `false` since we perform
// this before applying defaults
const defineBoolean = function({ replServer, opts, attr, help }) {
  replServer.defineCommand(attr, {
    action() {
      // eslint-disable-next-line fp/no-this
      this.clearBufferedCommand()
      // eslint-disable-next-line no-param-reassign, fp/no-mutation
      opts[attr] = !opts[attr]
      // eslint-disable-next-line no-console, no-restricted-globals
      console.log(`Option '${attr}' -> ${opts[attr]}`)
      // eslint-disable-next-line fp/no-this
      this.displayPrompt(true)
    },
    help,
  })
}
