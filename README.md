# CodersCamp

Monorepo containing CodersCamp internal application and its website.

## Project requirements

- [Yarn](https://yarnpkg.com/) (version 2.4 or higher)
- [Node](https://nodejs.org/) (version 14.0 or higher)
- [Docker](https://www.docker.com/)

## How to set up the project?

1. Clone the repository.
2. Run `yarn bootstrap` command to install all dependencies and generate some necessary files.
3. Run `docker-compose up -d` to start a database in the background.
4. On Unix systems, run `chmod -R +x scripts ` to add execute permission to all scripts inside `scripts` directory.

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

#### want to work with the panel**
- Run `docker-compose up -d` to start the database.
- Run `yarn w api dev` to start the server in development mode.
- Run `yarn w api panel` to start the panel in development mode.

#### want to work with the api**
- Run `docker-compose up -d` to start the database.
- Run `yarn w api dev` to start server in development mode.

#### want to work with the website**
- Run `yarn w website dev` to start the website in development mode.

#### want to create new components**
- Run `yarn w ui storybook` to run the storybook and see all component stories.

#### have troubles when running some script**
- Run `yarn clean` to clean move the entire project to a clean state.
- Run `yarn bootstrap` to populate the project again.
- Check StackOverflow and GitHub pasting the error message you got.
- Write on a development channel on our Slack.
