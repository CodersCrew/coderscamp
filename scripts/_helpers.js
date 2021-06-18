const shell = require('shelljs');
const { spawnSync } = require('child_process');

const exec = (script) => {
  spawnSync(script, { stdio: 'inherit', shell: true });
};

const log = (content) => {
  shell.echo(content);
};

const terminate = (message) => {
  log(message);
  shell.exit(1);
};

module.exports = { exec, log, terminate };
