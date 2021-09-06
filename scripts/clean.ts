import del from 'del';
import { readFileSync } from 'fs';
import { resolve } from 'path';

import { command, log } from './_helpers';

const toMonorepoPath = (path: string) => [path, `packages/**/${path}`];

/**
 * Removes all production output files, node_modules and clears Yarn cache.
 */
const main = () => {
  const gitignore = readFileSync(resolve(__dirname, '../.gitignore'), 'utf-8');
  const rootPaths = gitignore
    .split('\n')
    .filter((str) => str.trim() && !str.startsWith('#') && !str.startsWith('.env'));

  command('yarn cache clean');
  log('Yarn cache cleaned');

  del.sync(rootPaths.flatMap(toMonorepoPath), { expandDirectories: true, dot: true });
  log('All generated files deleted');
};

main();
