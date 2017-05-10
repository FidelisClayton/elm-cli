import generateModule from './functions/generate-module'
import fetchDocs from './functions/fetch-docs'
import eventEmitter from './event-emitter'

export default (cli) => {
  const input = cli.input[0]
  const flags = cli.flags

  switch(input) {
    case "generate":
      generateModule(flags)
      break;

    case "docs":
      if (cli.flags.hasOwnProperty('version')) {
        eventEmitter.emit('elm-cli', {
          type: 'fetch-package',
          payload: {
            packageName: cli.input[1],
            version: cli.flags.version
          }
        })
      } else {
        eventEmitter.emit('elm-cli', {
          type: 'fetch-package-versions',
          payload: {
            packageName: cli.input[1]
          }
        })
      }
      break;

    default:
      console.log("Option not found")
  }
}
