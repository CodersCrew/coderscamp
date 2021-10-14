import { exit } from 'shelljs';

import { command, log, query } from './_helpers';

/**
 * Runs ESLint only on changed files.
 */
const main = async () => {
  const targetBranch = process.env.TARGET_BRANCH || 'main';
  const currentBranch = query('git branch --show-current');

  if (targetBranch === currentBranch) {
    log('No files to be checked by ESLint. Target branch is the current branch.');
    exit(0);
  }

  const diff = query(`git diff --name-only --diff-filter=ACMRTUXB ${targetBranch}`);
  const filteredDiffArr = diff.split('\n').filter((path) => path.match(/\.(ts|tsx|js)$/));

  if (!filteredDiffArr.length) {
    log('No JS/TS files changed. Skipping ESLint script');
    exit(0);
  }

  log(`Running ESLint on ${filteredDiffArr.length} files`);
  command(`yarn eslint ${filteredDiffArr.join(' ')}`);
};

main();
