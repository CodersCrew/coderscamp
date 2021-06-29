# CodersCamp

Monorepo containing CodersCamp internal application and its website.

## Project requirements

- [Yarn](https://yarnpkg.com/) (version 2.4 or higher)
- [Node](https://nodejs.org/) (version 14.0 or higher)
- [Docker](https://www.docker.com/)

## How to set up the project?

1. Clone the repository.
2. Run `yarn` to install all dependencies.
3. On Unix systems, run `chmod -R +x scripts` to add execute permission to all scripts inside `scripts` directory.
4. Run `yarn bootstrap` command to generate some necessary files.
5. Run `docker-compose up -d` to start a database in the background.

## Packages

This project is organized in a monorepo structure and contains the following workspaces:

- **api** - backend server that serves and is used by the `panel`.
- **panel** - the main application used by CodersCamp participants.
- **shared** - logic that can be shared between all apps (`api`, `panel`, `website`)
- **ui** - design system used across `panel` and `website` workspaces.
- **website** - CodersCamp website.

## Scripts

- **w** - core script that allows you to run all workspace scripts from the root folder. To use it you need to follow this script with the workspace name and the script you want to run inside it. For example, running `yarn w website dev` will run the `dev` script inside the `website` workspace.
- **bootstrap** - installs all dependencies and generates all necessary files.
- **clean** - removes all production output files, node_modules and clears Yarn cache
- **test** - run tests across all workspaces in parallel.
- **eslint** - generic command used by other linter scripts.
- **lint** - runs ESLint for all project files.
- **lint:perf** - runs ESLint and reports performance (time) of every rule.

## What should I do when I ...?

#### want to work with the panel

- Run `docker-compose up -d` to start the database.
- Run `yarn w api dev` to start the server in development mode.
- Run `yarn w api panel` to start the panel in development mode.

#### want to work with the api

- Run `docker-compose up -d` to start the database.
- Run `yarn w api dev` to start server in development mode.

#### want to work with the website

- Run `yarn w website dev` to start the website in development mode.

#### want to create new components

- Run `yarn w ui dev` to run the storybook and see all component stories.

#### have troubles when running some script

- Run `yarn clean` to clean move the entire project to a clean state.
- Run `yarn` to install dependencies.
- Run `yarn bootstrap` to populate the project again.
- Check StackOverflow and GitHub pasting the error message you got.
- Write on a development channel on our Slack.

## Unified scripts

To increase project consistency, some standard scripts are unified across all workspaces.

- **dev** - runs the package in a local development mode.
- **build** - creates production build of the package.
- **start** - runs previously built package locally.
- **test** - runs tests for the package.

## PR naming rules

We have very precise rules over how our PR title can be formatted. This leads to more readable messages that are easy to follow when looking through the project history.

### PR Title Format

The PR title has a special format that includes a **type**, a **scope** and a **subject**:

```
<type>(<scope>): <subject>
```

The **type** and **subject** is mandatory but the **scope** is optional.

Samples:

```
feat(ui): Add Icon component.
```

```
fix: Correct minor typos in code
```

```
docs: Fix reference to Conventional Commits
```

### Type

Must be one of the following:

- **build**: Changes that affect the build system or external dependencies
- **ci**: Changes to our CI configuration files and scripts
- **docs**: Documentation only changes
- **feat**: A new feature
- **fix**: A bug fix
- **perf**: A code change that improves performance
- **refactor**: A code change that neither fixes a bug nor adds a feature
- **style**: Changes that do not affect the meaning of the code (white-space, formatting, missing semi-colons, etc)
- **test**: Adding missing tests or correcting existing tests

### Scopes

- **core** - Changes in the root directory
- **api**
- **panel**
- **website**
- **ui**

See [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/#specification) for more.
