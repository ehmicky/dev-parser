import { homedir } from 'os'
import { promisify } from 'util'

// Persist inputs in a file
export const setupHistory = async function(replServer, history) {
  // Like Node REPL
  // eslint-disable-next-line fp/no-mutation, no-param-reassign
  replServer.removeHistoryDuplicates = true

  if (!history) {
    return
  }

  await promisify(replServer.setupHistory.bind(replServer))(history)
}

export const DEFAULT_HISTORY = `${homedir}/.dev_parser_repl_history`
