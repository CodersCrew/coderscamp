import type { Config } from '@jest/types';
import { pathsToModuleNameMapper } from 'ts-jest/utils';

type JestConfig = Config.InitialOptions;

type Options = {
  tsconfig: string;
  paths?: Record<string, string[]>;
  overrides?: JestConfig;
};

export const createJestConfig = ({ tsconfig, paths = {}, overrides = {} }: Options): JestConfig => {
  const pathsMap = pathsToModuleNameMapper(paths) as Record<string, string>;
  const moduleNameMapper = Object.keys(pathsMap).reduce<Record<string, string>>(
    (acc, key) => ({ ...acc, [key]: `<rootDir>/${pathsMap[key]}` }),
    {},
  );

  return {
    moduleFileExtensions: ['js', 'ts', 'tsx', 'json'],
    roots: ['<rootDir>/src'],
    testMatch: ['**/?(*.)+(spec|test).+(ts|tsx|js)'],
    moduleNameMapper,
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
  };
};
