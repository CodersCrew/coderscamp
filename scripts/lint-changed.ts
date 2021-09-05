import { spawn } from 'child_process';
import { exit } from 'shelljs';

import { exec, log } from './_helpers';

const gitDiff = (targetBranch: string): Promise<string> => {
  const git = spawn('git', ['diff', '--name-only', '--diff-filter=ACMRTUXB', targetBranch]);

  let buffer = Buffer.alloc(0);

  return new Promise((resolve, reject) => {
    git.stdout.on('data', (data) => {
      buffer = Buffer.concat([buffer, data]);
    });
    git.stderr.on('data', (data) => reject(data.toString()));
    git.on('close', () => resolve(buffer.toString()));
  });
};

/**
 * Runs ESLint only on changed files.
 */
const main = async () => {
  const targetBranch = process.env.TARGET_BRANCH || 'main';
  const diff = await gitDiff(targetBranch);
  const filteredDiffArr = diff.split('\n').filter((path) => path.match(/\.(ts|tsx|js)$/));

  if (!filteredDiffArr.length) {
    log('No JS/TS files changed. Skipping ESLint script');
    exit(0);
  }

  log(`Running ESLint on ${filteredDiffArr.length} files`);
  exec(`yarn eslint ${filteredDiffArr.join(' ')}`);
};

main();
