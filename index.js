const fs = require("fs")
const ejs = require("ejs")
const meow = require("meow")

const elmCli = require("./src/elm-cli")

const cli = meow(`
  Usage
    $ foo <input>

  Options
    --import, -i  Import a package

  Examples
    $ foo unicorns --rainbow
    🌈 unicorns 🌈
`, {
  alias: {
    i: 'import'
  }
});

elmCli(cli)


ejs.renderFile('./main.ejs', { moduleName: "Main" }, function(err, data) {
  if (!err) {
    fs.writeFile("./Main.elm", data, function(err) {
      err ? console.log(err) : console.log("file writed")
    })
  }
})
