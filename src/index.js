//const app = require("./app");
const server = require("./app");
const chalk = require("chalk");

const port = process.env.PORT;

server.listen(port, () => {
  console.log(chalk.greenBright.inverse("Server is on | " + port));
});
