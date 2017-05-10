import marked from 'marked'
import TerminalRenderer from 'marked-terminal'
import ejs from 'ejs'
import chalk from 'chalk'

import { formatRecord, generateTypeField } from './utils'

const print = console.log

export const showTypeAliases = (data) => {
  const { module } = data
  const { aliases } = module

  aliases.map(alias => {
    const isRecord = alias.type.charAt(0) === "{"

    const aliasType = isRecord ? "```" + formatRecord(alias.type) + "```" : alias.type

    const msg =
      `${chalk.red('type alias')} ${chalk.blue.underline(alias.name)} ${alias.args.join(' ')} = \n` +
      `    ${aliasType} \n\n` +
      `${alias.comment.trim()}\n`

    print(marked(msg))
  })
}

export const showTypes = (data) => {
  const { module } = data
  const { types } = module

  types.map(type => {
    const typeCases = generateTypeField(type)
    const hasCases = typeCases.length > 0

    const msg =
      `${chalk.red("type")} ${chalk.blue.underline(type.name)} \n` +
      (hasCases ? chalk.yellow(typeCases) : "") + "\n\n" +
      type.comment.trim()

    print(marked(msg))

  })
}

export const showValues = (data) => {
  const { module } = data
  console.log("values")
}
