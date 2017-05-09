import inquirer from 'inquirer'
import marked from 'marked'
import TerminalRenderer from 'marked-terminal'

import { versionQuestion, moduleQuestion, coreQuestion } from './questions'
import eventEmitter from './event-emitter'
import { findItemByKey, unescapeValues } from './utils'

export const askVersion = data => {
  inquirer.prompt([versionQuestion(data.versions)])
    .then(res => ({
      type: 'fetch-package',
      payload: {
        packageName: data.packageName,
        version: res.version
      }
    }))
    .then(payload => eventEmitter.emit('elm-cli', payload))
}

export const askModule = data => {
  const moduleOptions = data.map(module => module.name)

  inquirer.prompt([moduleQuestion(moduleOptions)])
    .then(res => ({
      type: 'ask-core',
      payload: {
        module: res.module,
        modules: data
      }
    }))
    .then(payload => eventEmitter.emit('elm-cli', payload))
}

export const askCore = data => {
  const selectedModule = findItemByKey(data.module, 'name', data.modules)[0]

  const formatResponse = response => response.replace(" ", "-").toLowerCase()

  const questions = ['Type aliases', 'Types', 'Values']
  inquirer.prompt([coreQuestion(questions)])
    .then(res => ({
      type: formatResponse(res.core),
      payload: {
        module: selectedModule,
        modules: data.modules
      }
    }))
    .then(payload => eventEmitter.emit('elm-cli', payload))
}
