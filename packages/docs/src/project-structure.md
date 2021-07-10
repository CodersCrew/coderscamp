---
title: Project structure
description: How is the project structured, and what are our motivations behind this choice?
sidebar_position: 4
---

## Why monorepo?

Before we move to a description of particular files and directories, it's worth mentioning why we even decided to choose monorepo as a structure for the entire project. By doing so, we want to:

- **Ship only complete features** - with a monorepo, it's a breeze to ensure that we're reviewing and releasing only fully implemented, tested, and documented features. In most cases, the functionalities we need to implement affects many parts of the application. Let's use a simple login feature as an example. To implement it, we should: write a new API endpoint (api workspace), create a sign-in page with a form (panel workspace), and document our authentication flow (docs workspace). If we decided to divide those project parts into separate repositories, it would be more troublesome to ship them simultaneously.

- **Maintain cross-package documentation** - monorepo gives us the perfect opportunity to maintain complete project documentation in one place. This way, we're ensuring that all code changes requiring docs updates wouldn't be shipped without them.

- **Reuse configuration files** - we can create a configuration for CI, linting tools, and integrations only once. That makes it effortless to maintain consistent standards across the entire project and keep our config in accordance with the DRY rule.

- **Have a single source of truth** - we have one place where we can see which features are already in the implementation phase, which of them are waiting for review, what are current issues, and how many feature requests wait to be discussed/implemented.

- **Apply atomic changes** - we can make a single change and reflect it in all the packages. There is no need to move between many repositories each time we change some TypeScript type, utility function, or a part of the config.

- **Provide better API contracts** - we're creating TypeScript models for data exchanged through API and then reusing it both for the client and the server. As a result, we achieve [end-to-end type safety](https://www.youtube.com/watch?v=GrnBXhsr0ng).

## Root files and folders

```
coderscamp
├── .github
├── .vscode
├── .yarn
├── packages
├── scripts
├── .editorconfig
├── .eslintrc.js
├── .gitattributes
├── .gitignore
├── .npmrc
├── .prettierrc.js
├── .yarnrc.yml
├── app.json
├── jest.config.ts
├── LICENSE
├── package.json
├── Procfile
├── README.md
├── tsconfig.base.json
├── tsconfig.eslint.json
└── yarn.lock
```

**.github** - GitHub-related configuration.

**.vscode** - files related to [VS Code](https://code.visualstudio.com/) configuration. The most important file is `settings.json`. It will overwrite some of your default settings to adjust your linting, formatting, searching, and type-checking to the project. If you want, you can also install all recommended extensions from the `extensions.json`, to make your DX even better. Of course, if you prefer any other IDE, you can use it as well, but in such a case, the configuration is on your side.

**.yarn** - contains [Yarn](https://yarnpkg.com/) release used across the project and [Workspace Tools plugin](https://github.com/yarnpkg/berry/tree/master/packages/plugin-workspace-tools) that enhances Yarn possibilities when it comes to work with a monorepo.

**packages** - workspaces with code representing different parts of the project. You can read more about them [in the next section](#workspaces).

**scripts** - we moved some scripts from the root package.json to a separate directory. This way we can better describe their purpose and create more complex scripts that would be really long if we decide to put them directly into the package.json file.

**.editorconfig** - global configuration file for the [EditorConfig](https://editorconfig.org/) - tool that unifies some code formatting styles across all popular IDEs.

**eslintrc.js** - global configuration file for the [ESLint](https://eslint.org/) - static code analysis tool we use to keep our code style consistent.

**.gitattributes** - specifies separate merge strategies for individual files in our project and tells Git how to diff non-text files.

**.gitignore** - list of all files and directories across the entire monorepo that Git should ignore.

**.npmrc** - customizations for the npm. `engine-strict` disallows using engines that are not specified in the `package.json`'s `engines` field.

**.prettierrc.js** - [Prettier](https://prettier.io/) configuration for the entire project.

**.yarnrc.yml** - [Yarn](https://yarnpkg.com/) configuration file. Contains information about Yarn's version, used plugins, and module installation rules (usage of the node_modules instead of the Plug'n'Play mode).

**app.json** - one of [Heroku](https://heroku.com/) configuration files. Contains config for review environments.

**docker-compose.yml** - definitions of the Docker containers we want to run on our local environment. As for now, it contains only the config of the PostgreSQL database used by the api workspace.

**jest.config.ts** - configuration for the [Jest](https://jestjs.io/) testing framework we use to test each part of the project. It contains only a base configuration which is extended in Jest config files placed in particular workspaces.

**LICENSE** - license of the project.

**package.json** - root project configuration file. It contains devDependencies reused across the entire project and workspaces configuration.

**Procfile** - Heroku deployment configuration. Contains script that starts the app and script that should run before each release.

**README.md** - basic description of the project. It shouldn't cover too many details about the project development as those are covered by this documentation.

**tsconfig.base.json** - base for each workspace TypeScript configuration. It shouldn't ever be used as a standalone config file - always as a value for the `extends` key in `tsconfig.json` of a particular workspace.

**tsconfig.eslint.json** - an extended version of the `tsconfig.base.json` that includes all JS, TS, and TSX files across the project (base config has only files used to generate the production build).

**yarn.lock** - file with locked versions of project's dependencies.


## Workspaces

Workspaces contain code for different parts of the project. Each workspace is represented by a directory inside the `packages` directory. Thanks to Yarn, workspaces can be installed across the project like normal npm dependencies (although we don't use this feature too often, replacing it with TypeScript paths). Currently, our project contains the following workspaces:

**api** - backend server created with NestJS that serves and is used by the `panel`.

**docs** - project's documentation created with Docusaurus.

**panel** - the primary application used by CodersCamp participants and created with Vite.

**shared** - logic that can be shared across all apps (`api`, `panel`, `website`).

**ui** - design system used across `panel` and `website` workspaces.

**website** - CodersCamp website created with Next.js.

### Good to know

Each workspace contains a `package.json` file. It should always has:

- `private` property set to `true` as we don't plan to publish those packages,

- `version` property set to `"0.0.1"` as we track project version in the root `package.json` file,

- `name` property set to a value written as `@coderscamp/X`, where X represents the name of the workspace containing folder.
