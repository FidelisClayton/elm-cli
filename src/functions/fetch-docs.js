import axios from 'axios'
import inquirer from 'inquirer'
import marked from 'marked'
import Multispinner from 'multispinner'
import strip from 'strip-markdown'
import TerminalRenderer from 'marked-terminal'

import eventEmitter from '../event-emitter'

import { fetchVersions } from '../api'

marked.setOptions({
  renderer: new TerminalRenderer()
});

const moduleQuestions = (choices) => ({
  type: 'list',
  name: 'module',
  message: 'Which module?',
  choices: choices
})

const coreQuestions = (choices) => ({
  type: 'list',
  name: 'core',
  message: 'What you wanna?',
  choices: choices
})

const findModuleByName = (name, modules) => {
  return modules.filter(module => module.name === name)[0]
}

module.exports = (inputs, flags) => {
  const packageName = inputs[1]

  if (packageName) {
    fetchVersions(packageName)
      .then(versions => ({
        type: 'ask-versions',
        payload: {
          packageName,
          versions
        }
      }))
      .then(payload => {
        return eventEmitter.emit('elm-cli', payload)
      })
  }
}
