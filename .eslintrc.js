const TSCONFIG_PROJECTS = ['tsconfig.eslint.json', 'packages/**/tsconfig.json'];

const FILES_WITH_DEV_DEPENDENCIES = [
  '**/*.test.*',
  '**/*.spec.*',
  '**/vite.config.ts',
  '**/next.config.js',
  '**/*.stories.tsx',
  '**/setupTests.ts',
  'scripts/*.js',
];

module.exports = {
  root: true,
  env: {
    jest: true,
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
    project: TSCONFIG_PROJECTS,
    tsconfigRootDir: __dirname,
  },
  plugins: [
    '@typescript-eslint',
    'react',
    'react-hooks',
    'jest',
    'jest-dom',
    'prettier',
    'simple-import-sort',
    'testing-library',
  ],
  extends: [
    'eslint:recommended',
    'airbnb-typescript',
    'plugin:@typescript-eslint/recommended',
    'plugin:import/typescript',
    'plugin:prettier/recommended',
    'plugin:react-hooks/recommended',
  ],
  rules: {
    // Prevents from writing functions that are too complex (in terms of cyclomatic complexity).
    complexity: [2, 10],

    // Disabled as we're using simple-import-sort plugin.
    'sort-imports': 0,

    // Modified to allow for the usage of TypeScript references written with three slashes.
    'spaced-comment': [2, 'always', { markers: ['/'] }],

    // Many patterns results in creating classes that doesn't use `this` (e.g. DTOs, models).
    'class-methods-use-this': 0,

    // In many cases TS infers return type of a function so we don't need to provide it explicitly.
    '@typescript-eslint/explicit-module-boundary-types': 0,

    // In cases we have to declare an unused variable we want to enforce it will be written with `_` prefix.
    '@typescript-eslint/no-unused-vars': [2, { argsIgnorePattern: '^_' }],

    // Enforce consistency in array types writing. We always use `T[]` instead of `Array<T>`.
    '@typescript-eslint/array-type': 2,

    // Disallows to create generics that explicitly extends `unknown` as it's the default TS behavior.
    '@typescript-eslint/no-unnecessary-type-constraint': 2,

    // Enforces some naming conventions across the codebase.
    '@typescript-eslint/naming-convention': [
      2,
      { selector: 'default', leadingUnderscore: 'allow', format: ['camelCase', 'UPPER_CASE', 'PascalCase'] },
      { selector: 'function', format: ['camelCase', 'PascalCase'] },
      { selector: 'parameter', format: ['camelCase'], leadingUnderscore: 'allow' },
      { selector: 'typeLike', format: ['PascalCase'] },

      // Interfaces shouldn't be prefixed with `I`.
      { selector: 'interface', format: ['PascalCase'], custom: { regex: '^I[A-Z]', match: false } },

      // Types shouldn't be prefixed with `T`.
      { selector: 'typeAlias', format: ['PascalCase'], custom: { regex: '^T[A-Z]', match: false } },

      // Generics should have meaningful names instead of one-letters.
      { selector: 'typeParameter', format: ['PascalCase'], custom: { regex: '[a-zA-Z]{2,}', match: true } },
    ],

    // Disabled as we're using simple-import-sort plugin.
    'import/order': 0,

    // To make imports better searchable we always use named exports.
    'import/prefer-default-export': 0,
    'import/no-default-export': 2,

    // Allows for dev dependencies imports in files that wouldn't be a part of production code.
    'import/no-extraneous-dependencies': [2, { devDependencies: FILES_WITH_DEV_DEPENDENCIES }],

    // Automatically sorts imports to ensure their consistency.
    'simple-import-sort/imports': [
      2,
      {
        groups: [
          ['^\\u0000'], // Side effects.
          ['^react', '^(?!@coderscamp.*$)@?\\w'], // Packages from node_modules. React-related packages will be first.
          ['^@coderscamp.'], // Monorepo packages imports.
          ['^[^.]'], // Absolute imports.
          ['^\\.'], // Relative imports.
        ],
      },
    ],
  },
  overrides: [
    {
      // Files with React components.
      files: ['*.tsx'],
      rules: {
        // Ensures we provide a key when rendering components in iteration.
        'react/jsx-key': 2,

        // There is no need for prop types as we use TypeScript.
        'react/prop-types': 0,

        // We see no reason to prevent props spreading in react components.
        'react/jsx-props-no-spreading': 0,

        // As the project uses JSX transform, there is no need for importing React explicitly.
        'react/react-in-jsx-scope': 0,

        // To be consistent we want to always use arrow function when creating components.
        'react/function-component-definition': [2, { namedComponents: 'arrow-function' }],

        // In many cases undefined is considered a valid value for a prop.
        'react/require-default-props': 0,
      },
    },
    {
      // Files that have to use CommonJS imports.
      files: ['*.js'],
      rules: { '@typescript-eslint/no-var-requires': 0 },
    },
    {
      // Files that should to contain a default export.
      files: ['*.config.[tj]s', 'packages/website/pages/**/*.tsx', '*.stories.tsx'],
      rules: { 'import/no-default-export': 0 },
    },
    {
      // Enable plugins rules only for test files
      files: ['**/?(*.)+(spec|test).ts?(x)'],
      extends: ['plugin:testing-library/react', 'plugin:jest-dom/recommended', 'plugin:jest/recommended'],
    },
  ],
  settings: {
    jest: {
      version: 'detect',
    },
    react: { version: 'detect' },
    'import/resolver': {
      node: {
        paths: ['src'],
        extensions: ['.js', '.ts', '.tsx'],
      },
      typescript: {
        project: TSCONFIG_PROJECTS,
      },
    },
  },
};
