import { esprima } from './esprima.js'
import { acorn } from './acorn.js'
import { espree } from './espree.js'
import { typescriptEstree } from './typescript_estree.js'
import { meriyah } from './meriyah.js'
import { babel, babelEstree } from './babel/main.js'

export const parsers = {
  esprima,
  acorn,
  espree,
  typescriptEstree,
  meriyah,
  babel,
  babelEstree,
}
