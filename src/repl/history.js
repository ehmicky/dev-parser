import { homedir } from 'node:os'
import { promisify } from 'node:util'

// Persist inputs in a file
export const setupHistory = async (replServer, history) => {
  // Like Node REPL
  // eslint-disable-next-line fp/no-mutation, no-param-reassign
  replServer.removeHistoryDuplicates = true

  if (!history) {
    return
  }

  await promisify(replServer.setupHistory.bind(replServer))(history)
}

export const DEFAULT_HISTORY = `${homedir}/.dev_parser_repl_history`
