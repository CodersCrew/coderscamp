import { resolve } from 'path';
// eslint-disable-next-line import/no-extraneous-dependencies
import { pathsToModuleNameMapper } from 'ts-jest/utils';

import { createJestConfig } from '../../jest.config';
import { compilerOptions } from './tsconfig.json';

const paths = pathsToModuleNameMapper(compilerOptions.paths) as Record<string, string>;
const moduleNameMapper = Object.keys(paths).reduce<Record<string, string>>(
  (acc, key) => ({ ...acc, [key]: `<rootDir>/${paths[key]}` }),
  {},
);

export default createJestConfig({
  tsconfig: resolve(__dirname, 'tsconfig.json'),
  moduleNameMapper,
  overrides: {
    collectCoverageFrom: ['**/*.ts'],
  },
});
