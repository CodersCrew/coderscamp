---
title: Scripts
description: How to use scripts defined in package.json files?
sidebar_position: 3
---

## Root scripts

Scripts contained in package.json file in the root project folder.

**w** - core script that allows you to run all workspace scripts from the root folder. To use it you need to follow this script with the workspace name and the script you want to run inside it. For example, running `yarn w website dev` will run the `dev` script inside the `website` workspace.

**bootstrap** - installs all dependencies and generates all necessary files. Use this script each time you pull code from the GitHub.

**clean** - removes all production output files, node_modules and clears Yarn cache.

**typecheck** - run TypeScript types check across all workspaces in parallel.

**test** - run tests across all workspaces in parallel.

**eslint** - generic command used by other linter scripts.

**lint** - runs ESLint for all project files.

**lint:perf** - runs ESLint and reports performance (time) of every rule.

**heroku-postbuild** - is used internally by Heroku when it installs all project dependencies. Don't use it locally.


## Unified scripts

To increase project consistency, some standard scripts are unified across all workspaces.


**dev** - runs the package in a local development mode.

**build** - creates production build of the package.

**start** - runs previously built package locally.

**test** - runs tests for the package.

**typecheck** - checks TypeScript types for the package.


## Scripts best practices

### Always run script from the project's root directory

**🕐 When**

You want to run script for a particular workspace.

**🚨 Don't**

```sh
cd ./packages/panel && yarn dev
```

```sh
cd ./packages/api && yarn add lodash
```

**✅ Do**

```sh
yarn w panel dev
```

```sh
yarn w api add lodash
```

**🧐 Why?**

The entire project is configured in a way where you can run any workspace script from the root folder. To achieve it just invoke `yarn w [suffix] [command]` where `suffix` is workspace directory name and `command` is the command you want to invoke. This way is the simplest one as you don't need to switch between folders to run particular scripts.