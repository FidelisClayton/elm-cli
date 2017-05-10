const fs = require("fs")
const ejs = require("ejs")
const meow = require("meow")

import elmCli from './src/elm-cli'

import eventEmitter from './src/event-emitter'
import dispatcher from './src/dispatch'

dispatcher(eventEmitter)

const description =
  `
    Usage
      $ foo <input>

    Options
      --import, -i  Import a package
      --version, -v Specify version of the package

    Examples
      $ foo unicorns --rainbow
      🌈 unicorns 🌈
  `

const cli = meow({
    description,
    version: false
  }, {
  alias: {
    i: 'import',
    v: 'version'
  }
});

elmCli(cli)
