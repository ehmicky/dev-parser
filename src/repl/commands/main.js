import { ARRAY_GROUP } from './array.js'
import { BOOLEAN_GROUP } from './boolean.js'

// Define REPL commands starting with dots.
// They are used to modify the current options.
export const defineCommands = function (replServer, parseOpts) {
  GROUPS.forEach(({ action, commands }) => {
    defineGroup({ replServer, parseOpts, action, commands })
  })
}

const GROUPS = [ARRAY_GROUP, BOOLEAN_GROUP]

const defineGroup = function ({ replServer, parseOpts, action, commands }) {
  commands.forEach(({ attr, name, help }) => {
    defineCommand({ replServer, parseOpts, attr, name, help, action })
  })
}

const defineCommand = function ({
  replServer,
  parseOpts,
  attr,
  name,
  help,
  action,
}) {
  replServer.defineCommand(name, {
    action() {
      // eslint-disable-next-line fp/no-this
      this.clearBufferedCommand()

      action({ parseOpts, attr, name })

      // eslint-disable-next-line fp/no-this
      this.displayPrompt(true)
    },
    help,
  })
}
