const shell = require("shelljs");
const chalk = require("chalk");

const getCommands = (projectName) => {
  const commandsMap = {
    "portfolio-with-nuxtjs": "npm run generate",
    "vue-with-webpack": "npm run build",
    "real-world-vuejs": "npm run build",
  };
  const buidCommand = commandsMap[projectName] || "npm run build";

  return ["git pull origin master", "npm install", buidCommand];
};

const executeCommands = (commands, cb) => {
  const execute = () => {
    console.log(chalk.green(`\nExecute command:  ${commands[0]}\n`));

    shell.exec(commands.shift(), (code, stdout, stderr) => {
      if (code !== 0) {
        return cb(stderr);
      }
      if (commands.length) {
        return execute();
      }
      return cb(false);
    });
  };

  execute();
};

const rebuild = (projectName) => {
  const commands = getCommands(projectName);
  shell.cd(`../${projectName}`);
  executeCommands(commands, (err) => {
    if (err) {
      console.log(chalk.red(`\nERROR:  ${err}\n`));
    } else {
      console.log(chalk.green("\nDONE\n"));
    }
  });
};

module.exports = {
  rebuild,
};
