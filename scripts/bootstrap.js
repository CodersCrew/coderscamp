#!/usr/bin/env node
const { exec } = require('./_helpers');

/**
 * Initializes the entire project and creates generated files.
 * @tip Use this script every time you pull something from the origin.
 */
const main = () => {
  exec('yarn');
  exec('concurrently "yarn workspace @coderscamp/ui generate" "yarn workspace @coderscamp/api generate"');
};

main();
