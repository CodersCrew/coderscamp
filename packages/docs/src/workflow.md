---
title: Workflow
description: How our workflow looks like and what restriction it implies?
sidebar_position: 5
---

## Tasks workflow

### Default workflow

1. Assign yourself to an issue. As a result, a new branch for the issue will be created.

2. Pull the created branch locally and start your work.

3. Make as many commits as you want and name them as you wish. Remember that if you plan to have only one commit, it needs to follow the commit conventions described in the next chapter.

4. When the task is done, create a pull request on GitHub. Its name should follow the conventions from the next chapter. Create it as a draft, and don't add any reviewers for now.

5. Wait for all checks to pass and all preview deployments to be ready.

6. Check if all preview deployments work (there is no white screen or error page).

7. If everything is all right, add reviewers to your PR and remove the draft status.

5. Wait for two approvals from other developers.

6. Click the "Squash and merge" button to merge your changes to the `main` branch.

### Small refactors (chores)

Sometimes you will find tasks so small that making an issue of them will take longer than finishing the entire task. In such cases, you can skip the first two points of the default workflow and create a branch with a name prefixed by `chore-` and do the task immediately. Remember to describe the change and reasoning behind it in the body of your pull request.

## Commit conventions

:::note

You can name commits on your branches however you want. We use the "Squash and merge" strategy for pull requests, so the following rules apply only to PRs as merge commits are derived from them. **They also apply in cases where you have only one commit on your branch.**

:::

This project uses [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/) to ensure that each commit
solves only one problem, and its message clearly describes changes that were made. According to that assumptions, commit
messages have to match the following structure.

```
<type>[optional scope]: <description>

[optional body]

[optional footer(s)]
```

### type (required)

One word, followed by parenthesis (if we want to add a scope) and a colon. Describes the category of your change. In this
project, we use basic types set provided by
[@commitlint/config-conventional](https://github.com/conventional-changelog/commitlint/blob/master/@commitlint/config-conventional), which includes the following types:


- **build**: Changes that affect the build system or external dependencies.

- **chore**: Update something without impacting the user (e.g. bump a dependency in package.json).

- **ci**: Changes to our CI configuration files and scripts.

- **docs**: Documentation only changes.

- **feat**: A new feature.

- **fix**: A bug fix.

- **perf**: A code change that improves performance.

- **refactor**: A code change that neither fixes a bug nor adds a feature.

- **revert**: A code change that reverts another commit.

- **style**: Changes that do not affect the meaning of the code (white-space, formatting, missing semi-colons, etc.).

- **test**: Adding missing tests or correcting existing tests.

### scope (optional)

Part of the project affected by the changes.

- **core** - Changes made in the project's root (global configs, scripts, etc.).

- **api** - Changes made only in the `api` and/or `shared` directory.

- **panel** - Changes made only in the `panel` and/or `shared` directory.

- **website** - Changes made only in the `website` and/or `shared` directory.

- **ui** - Changes made only in the `ui` and/or `shared` directory.

- **deps** - Use with the `chore` type to name commits that updates project's dependencies.

If your changes aren't related to those parts of the project (or are related to many of them), you can leave the scope empty. We don't specify a `docs` scope as for documentation changes, you can simply use the `docs` type.

### description (required)

Succinct description of the change. This is the easiest part, as you should just copy the name of an issue your PR is related to and change its first letter to be lowercase. Remember to put `(#ISSUE_ID)` at the end and not put a dot there.

### body (optional)

Just as in the description, use the imperative, present tense. The body should include the motivation for the change and
contrast this with previous behavior. If you think that description exhausted the topic, there is no need for providing
the body.

### footer(s) (optional)

As your commit (PR) is directly related to a particular issue, the footer is the best place to mention it. Do it using the `Closes #ISSUE_ID` format.

### Example pull requests

```
feat(ui): Add Icon component. (#1)

Closes #1
```

```
fix: Correct minor typos in code (#91)

Closes #91
```

```
docs: Fix reference to Conventional Commits (#15)

Closes #15
```

