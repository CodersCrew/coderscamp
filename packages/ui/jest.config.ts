import { resolve } from 'path';

import { createJestConfig } from '../../jest.config';

export default createJestConfig({
  tsconfig: resolve(__dirname, 'tsconfig.json'),
  moduleNameMapper: { '^@/(.+)': '<rootDir>/src/$1' },
  overrides: {
    testEnvironment: 'jsdom',
    setupFilesAfterEnv: ['<rootDir>/setupTests.ts'],
  },
});
