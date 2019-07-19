import { ARRAY_GROUP } from './array.js'
import { BOOLEAN_GROUP } from './boolean.js'

// Define REPL commands starting with dots.
// They are used to modify the current options.
export const defineCommands = function(replServer, opts) {
  GROUPS.forEach(({ action, commands }) =>
    defineGroup({ replServer, opts, action, commands }),
  )
}

const GROUPS = [ARRAY_GROUP, BOOLEAN_GROUP]

const defineGroup = function({ replServer, opts, action, commands }) {
  commands.forEach(({ attr, name, help }) =>
    defineCommand({ replServer, opts, attr, name, help, action }),
  )
}

const defineCommand = function({ replServer, opts, attr, name, help, action }) {
  replServer.defineCommand(name, {
    action() {
      // eslint-disable-next-line fp/no-this
      this.clearBufferedCommand()

      action({ opts, attr, name })

      // eslint-disable-next-line fp/no-this
      this.displayPrompt(true)
    },
    help,
  })
}
