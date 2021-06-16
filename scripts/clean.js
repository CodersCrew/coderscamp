#!/usr/bin/env node
const shell = require('shelljs');

const patternsToRemoveArr = ['node_modules', 'dist', 'storybook-static', '.next', 'yarn-error.log'];
const patternsToRemoveStr = patternsToRemoveArr.map((pattern) => `${pattern} **/${pattern}`).join(' ');

const script = `rimraf ${patternsToRemoveStr} && yarn cache clean`;

shell.echo(script);
shell.exec(script);
