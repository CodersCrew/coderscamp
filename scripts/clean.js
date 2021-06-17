#!/usr/bin/env node
const shell = require('shelljs');
const { spawnSync } = require('child_process');

const OUTPUT_DIRS = ['dist', 'storybook-static', '.next', 'yarn-error.log'];

const toMonorepoPath = (path) => `${path} packages/**/${path}`;

/**
 * Removes all production output files and node_modules.
 */
const main = () => {
  const pathsToRemove = [...OUTPUT_DIRS, 'node_modules'].map(toMonorepoPath).join(' ');

  const script = `rimraf ${pathsToRemove} && yarn cache clean`;

  shell.echo(script);
  spawnSync(script, { stdio: 'inherit', shell: true });
};

main();
