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
        --template, -t Specify the template

      docs
        --version, -v Specify version of the package
        --query, -q Specify a Type alias, type or value to search on docs

    Examples
      $ elm-cli docs rtfeldman/elm-css
      $ elm-cli generate Main -i Html -i Html.Events
      $ elm-cli generate Main -i Html.Events[onClick,onInput] -t program
  `

const cli = meow({
    description,
    version: false
  }, {
  alias: {
    i: 'import',
    v: 'version',
    q: 'query',
    m: 'module',
    t: 'template'
  }
});

elmCli(cli)
