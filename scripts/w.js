#!/usr/bin/env node
const shell = require('shelljs');
const { spawnSync } = require('child_process');

const WORKSPACES = ['api', 'panel', 'ui', 'website'];

const getWorkspaceName = () => {
  const workspace = process.argv[2];

  if (!WORKSPACES.includes(workspace)) {
    shell.echo(`Error: Unsupported workspace name "${workspace}". Supported workspaces are: ${WORKSPACES.join(', ')}`);
    shell.exit(1);
  }

  return workspace;
};

const getWorkspaceScript = () => {
  const command = process.argv.slice(3).join(' ');

  if (!command) {
    shell.echo(`Error: No workspace script to execute`);
    shell.exit(1);
  }

  return command;
};

/**
 * Allows to run script for a particular workspace.
 * @example yarn w panel dev
 */
const main = () => {
  const script = `yarn workspace @coderscamp/${getWorkspaceName()} ${getWorkspaceScript()}`;

  shell.echo(`Running script: ${script}`);
  spawnSync(script, { stdio: 'inherit', shell: true });
};

main();
