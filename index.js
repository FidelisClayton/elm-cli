const fs = require("fs")
const ejs = require("ejs")
const meow = require("meow")

import inquirer from 'inquirer'

import elmCli from './src/elm-cli'

import eventEmitter from './src/event-emitter'
import dispatcher from './src/dispatch'

dispatcher(eventEmitter)

const description =
  `
    Usage
      $ foo <input>

    Options
      generate
        --import, -i  Import a package

      docs
        --version, -v Specify version of the package
        --query, -q Specify a Type alias, type or value to search on docs

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
    v: 'version',
    q: 'query'
  }
});

elmCli(cli)
