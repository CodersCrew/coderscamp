import { resolve } from 'path';

import { createJestConfig } from '../../jest.config';
import { compilerOptions } from './tsconfig.json';

export default createJestConfig({
  tsconfig: resolve(__dirname, 'tsconfig.json'),
  paths: compilerOptions.paths,
  overrides: {
    collectCoverageFrom: ['**/*.ts'],
  },
});
