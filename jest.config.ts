import type { Config } from '@jest/types';

type JestConfig = Config.InitialOptions;

type Options = {
  tsconfig: string;
  moduleNameMapper?: Record<string, string>;
  overrides?: JestConfig;
  collectCoverageFrom?: string[];
};

export const createJestConfig = ({
  tsconfig,
  moduleNameMapper = {},
  overrides = {},
  collectCoverageFrom = [],
}: Options): JestConfig => ({
  moduleFileExtensions: ['js', 'ts', 'tsx', 'json'],
  roots: ['<rootDir>/src'],
  testMatch: ['**/?(*.)+(spec|test).+(ts|tsx|js)'],
  collectCoverageFrom: ['**/*.{ts,tsx}', '!**/*.d.ts', ...collectCoverageFrom],
  moduleNameMapper: {
    '^@coderscamp/([a-z-]+)/(.+)': '<rootDir>/../$1/src/$2',
    ...moduleNameMapper,
  },
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest',
    '^.+\\.(svg|css|styl|less|sass|scss|png|jpg|ttf|woff|woff2)$': 'jest-transform-stub',
  },
  globals: {
    'ts-jest': {
      tsconfig,
      isolatedModules: true,
    },
  },
  ...overrides,
});
