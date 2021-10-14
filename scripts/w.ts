import { command, log, terminate } from './_helpers';

const WORKSPACES = ['api', 'docs', 'panel', 'ui', 'website', 'shared'];

const getWorkspaceName = () => {
  const workspace = process.argv[2];

  if (!WORKSPACES.includes(workspace)) {
    terminate(`Error: Unsupported workspace name "${workspace}". Supported workspaces are: ${WORKSPACES.join(', ')}`);
  }

  return workspace;
};

const getWorkspaceScript = () => {
  const script = process.argv.slice(3).join(' ');

  if (!script) {
    terminate(`Error: No workspace script to execute`);
  }

  return script;
};

/**
 * Allows to run script for a particular workspace.
 * @example yarn w panel dev
 */
const main = () => {
  const script = `yarn workspace @coderscamp/${getWorkspaceName()} ${getWorkspaceScript()}`;

  log(`Running script: ${script}`);
  command(script);
};

main();
