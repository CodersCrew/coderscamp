import { resolve } from 'path';

import { createJestConfig } from '../../jest.config';

export default createJestConfig({
  tsconfig: resolve(__dirname, 'tsconfig.json'),
  moduleNameMapper: { '^@/(.+)': '<rootDir>/src/$1' },
  collectCoverageFrom: [
    '!**/(theme|icons)/**',
    '!**/*.(stories|mocks).{ts,tsx}',
    '!**/index.{ts,tsx}',
    '!**/components/*.tsx',
  ],
  overrides: {
    testEnvironment: 'jsdom',
    setupFilesAfterEnv: ['<rootDir>/setupTests.ts'],
  },
});
