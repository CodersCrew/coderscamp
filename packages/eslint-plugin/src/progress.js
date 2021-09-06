/* eslint-disable no-console */
const chalk = require('chalk');

const ROOT_PATH = `${process.cwd()}/`;

process.on('exit', (exitCode) => {
  if (exitCode === 0) {
    console.log(chalk.bgBlue.black('Linting finished!'));
  }
});

module.exports = {
  name: __filename,
  create: (context) => {
    const filename = context.getFilename();
    const relativeFilePath = filename.replace(ROOT_PATH, '');

    console.log(`Linting: ${chalk.cyan(relativeFilePath)}`);

    return {};
  },
};
