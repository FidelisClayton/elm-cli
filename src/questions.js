export const moduleQuestion = choices => ({
  type: 'list',
  name: 'module',
  message: 'Which module?',
  choices: choices
})

export const coreQuestion = choices => ({
  type: 'list',
  name: 'core',
  message: 'What do you wanna?',
  choices: choices
})

export const versionQuestion = (choices) => ({
  type: 'list',
  name: 'version',
  message: 'Which version?',
  choices: choices
})
