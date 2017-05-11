import generateModule from './generate/module'
import generateProgram from './generate/program'
import eventEmitter from './event-emitter'

export default (cli) => {
  const input = cli.input[0]
  const flags = cli.flags

  switch(input) {
    case "generate": {
      if (cli.flags.hasOwnProperty('template')) {
        switch(flags.template) {
          case "program": {
            generateProgram(cli)
            break;
          }

          case "view": {
            generateModule(cli)
          }

          default:
            generateModule(cli)
        }
      } else {
        generateModule(cli)
      }

      break
    }

    case "docs":
      if (cli.flags.hasOwnProperty('version')) {
        eventEmitter.emit('elm-cli', {
          type: 'fetch-package',
          payload: {
            packageName: cli.input[1],
            version: cli.flags.version,
            query: cli.flags.query
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
