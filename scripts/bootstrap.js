#!/usr/bin/env node
const shell = require('shelljs');

/**
 * Initializes the entire project and build shared dependencies.
 * @tip Use this script every time you pull something from the origin.
 */
const main = () => {
  shell.exec('yarn');
  shell.exec('yarn workspace @coderscamp/ui theme');
  shell.exec('yarn workspace @coderscamp/ui build');
};

main();
