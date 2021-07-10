---
title: Getting started
description: How to run the project and its particular elements?
sidebar_position: 2
---

## Project requirements

- [Yarn](https://yarnpkg.com/) (version 2.4 or higher)
- [Node](https://nodejs.org/) (version 14.0 or higher)
- [Docker](https://www.docker.com/)

## How to run the project for the first time?

1. Clone the repository.

2. Run `yarn` to install all dependencies.

3. Copy `.env.example` file in `packages/api` directory and rename it to `.env`.

4. Run `yarn bootstrap` command to generate some necessary files.

5. Run `docker-compose up -d` to start a database in the background.


## How to shut the project down?

1. Terminate all scripts running in terminals.

2. Terminate Docker using `docker compose down` command.


## What should I do when I ...?

#### want to work with the panel

- Run `docker-compose up -d` to start the database.
- Run `yarn w api dev` to start the server in development mode.
- Run `yarn w panel dev` to start the panel in development mode.

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
- If it didn't help, check StackOverflow and GitHub, pasting the error message you got.
- If it didn't help, write on a development channel on our Slack.