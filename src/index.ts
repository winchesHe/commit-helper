import type { ExtensionContext } from 'vscode'
import { commands, window } from 'vscode'
import { shellHistory } from './helper'

const prefix = ['GROOM-', 'OBV-', 'APP-', 'CS-', 'MOE-', 'TECH-', 'ERP-']

export function activate(cxt: ExtensionContext) {
  cxt.subscriptions.push(
    commands.registerCommand('moego-terminal-helper', () => {
      const commitList = shellHistory().filter(i => prefix.some(l => i.includes(l))).reverse()
      const choiceInfo = window.showQuickPick(commitList, {
        placeHolder: 'MoeGo Commit 信息填写工具',
      })
      choiceInfo.then((value) => {
        if (value) {
          window.activeTerminal?.sendText(value, false)
        }
        else {
          // window.showInformationMessage('No commit info selected')
        }
      })
    }),
    commands.registerCommand('moego-terminal-helper-only-prefix', () => {
      const commitList = shellHistory().filter(i => prefix.some(l => i.includes(l))).reverse()
      const choiceInfo = window.showQuickPick(commitList, {
        placeHolder: 'MoeGo Commit 信息填写工具 (仅填写前缀e.g. ERP-1234)',
      })
      choiceInfo.then((value) => {
        if (value) {
          const prefix = value.match(/(GROOM-|OBV-|APP-|CS-|MOE-|TECH-|ERP-)\d+/)?.[0]

          if (prefix) {
            window.activeTerminal?.sendText(prefix, false)
          }
          else {
            // window.showInformationMessage('No prefix info matched')
          }
        }
        else {
          // window.showInformationMessage('No commit info selected')
        }
      })
    }),
  )
}

export function deactivate() {

}
