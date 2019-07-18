import { ARRAY_COMMANDS } from './array.js'
import { BOOLEAN_COMMANDS } from './boolean.js'

// Define REPL commands starting with dots.
// They are used to modify the current options.
export const defineCommands = function(replServer, opts) {
  defineGroup({ replServer, opts, commands: ARRAY_COMMANDS }, defineArray)
  defineGroup({ replServer, opts, commands: BOOLEAN_COMMANDS }, defineBoolean)
}

const defineGroup = function({ replServer, opts, commands }, defineFunc) {
  commands.forEach(({ attr, name, help }) =>
    defineCommand({ replServer, opts, attr, name, help }, defineFunc),
  )
}

const defineCommand = function({ replServer, opts, attr, name, help }, action) {
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

const defineArray = function({ opts, attr, name }) {
  // eslint-disable-next-line no-param-reassign, fp/no-mutation
  opts[attr] = getArrayValues({ opts, attr, name })

  // eslint-disable-next-line no-console, no-restricted-globals
  console.log(`Option '${attr}' -> [${opts[attr].join(', ')}]`)
}

const getArrayValues = function({ opts, attr, name }) {
  if (opts[attr].includes(name)) {
    return opts[attr].filter(nameA => nameA !== name)
  }

  return [...opts[attr], name]
}

const defineBoolean = function({ opts, name }) {
  // eslint-disable-next-line no-param-reassign, fp/no-mutation
  opts[name] = !opts[name]

  // eslint-disable-next-line no-console, no-restricted-globals
  console.log(`Option '${name}' -> ${opts[name]}`)
}
