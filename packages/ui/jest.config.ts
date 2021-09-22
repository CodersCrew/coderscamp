import { resolve } from 'path';

import { createJestConfig } from '../../jest.config';

export default createJestConfig({
  tsconfig: resolve(__dirname, 'tsconfig.json'),
  overrides: {
    testEnvironment: 'jsdom',
    setupFilesAfterEnv: ['<rootDir>/setupTests.ts'],
    collectCoverageFrom: [
      'src/components/**/*.tsx',
      '!**/*.(stories|mocks).{ts,tsx}',
      '!**/index.{ts,tsx}',
      '!**/components/*.tsx',
    ],
  },
});
