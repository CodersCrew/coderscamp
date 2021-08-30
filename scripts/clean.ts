import { exec, log } from './_helpers';

const OUTPUT_DIRS = ['dist', 'storybook-static', '.next', 'yarn-error.log'];

const toMonorepoPath = (path) => `${path} packages/**/${path}`;

/**
 * Removes all production output files, node_modules and clears Yarn cache.
 */
const main = () => {
  const pathsToRemove = [...OUTPUT_DIRS, 'node_modules'].map(toMonorepoPath).join(' ');

  const script = `rimraf ${pathsToRemove} && yarn cache clean`;

  log(script);
  exec(script);
};

main();
