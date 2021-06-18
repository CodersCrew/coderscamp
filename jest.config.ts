import type { Config } from '@jest/types';

type JestConfig = Config.InitialOptions;

type Options = {
  tsconfig: string;
  moduleNameMapper?: Record<string, string>;
  overrides?: JestConfig;
};

export const createJestConfig = ({ tsconfig, moduleNameMapper = {}, overrides = {} }: Options): JestConfig => ({
  moduleFileExtensions: ['js', 'ts', 'tsx', 'json'],
  roots: ['<rootDir>/src'],
  testMatch: ['**/?(*.)+(spec|test).+(ts|tsx|js)'],
  collectCoverageFrom: ['**/*.tsx?'],
  moduleNameMapper: {
    '^@coderscamp/([a-z-]+)/(.+)': '<rootDir>/../$1/src/$2',
    ...moduleNameMapper,
  },
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest',
  },
  globals: {
    'ts-jest': {
      tsconfig,
      isolatedModules: true,
    },
  },
  ...overrides,
});
