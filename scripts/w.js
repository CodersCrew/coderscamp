#!/usr/bin/env node

const { log, terminate, exec } = require('./_helpers');

const WORKSPACES = ['api', 'panel', 'ui', 'website', 'shared'];

const getWorkspaceName = () => {
  const workspace = process.argv[2];

  if (!WORKSPACES.includes(workspace)) {
    terminate(`Error: Unsupported workspace name "${workspace}". Supported workspaces are: ${WORKSPACES.join(', ')}`);
  }

  return workspace;
};

const getWorkspaceScript = () => {
  const command = process.argv.slice(3).join(' ');

  if (!command) {
    terminate(`Error: No workspace script to execute`);
  }

  return command;
};

/**
 * Allows to run script for a particular workspace.
 * @example yarn w panel dev
 */
const main = () => {
  const script = `yarn workspace @coderscamp/${getWorkspaceName()} ${getWorkspaceScript()}`;

  log(`Running script: ${script}`);
  exec(script);
};

main();
