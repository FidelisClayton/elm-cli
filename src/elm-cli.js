import generateModule from './functions/generate-module'
import fetchDocs from './functions/fetch-docs'

export default (cli) => {
  const input = cli.input[0]
  const flags = cli.flags

  // console.log(cli)

  switch(input) {
    case "generate":
      generateModule(flags)
      break;

    case "docs":
      fetchDocs(cli.input, flags)
      break;

    default:
      console.log("Option not found")
  }
}
