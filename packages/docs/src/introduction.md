---
title: Introduction
description: How to use this documentation?
sidebar_position: 1
slug: /
---

Writing well-crafted code is a challenging task. It gets even more complicated when you want to do it in a large team where everyone brings different practices to the table. Addressing this challenge, we decided to create a single source of truth when it comes to the development of the project.

## How can you use these docs?

- If you are new to the project, take some time to read the entire docs page by page. It would give you a detailed overview of how the project works from a developer's perspective. As a result, you will be able to contribute quicker and with higher confidence. Remember to give us a call using GitHub issues when you encounter some questions that the documentation doesn't cover yet.

- Try to refer to the docs as much as possible in your code reviews. As the docs are maintained and discussed by the entire team, they are the best way to keep unified standards across the codebase. It also makes it easier for you and other team members to remember practices written here. The last but just as important advantage is that we have a better chance to spot missing parts of the documentation and add them.

- When you spot that you need to write similar things in many code reviews, you should definitely move that advice to the docs. If you don't know where to place them, treat the [Best Practices](best-practices.md) document as the universal one.

- If you are a developer unrelated to this project, feel free to use parts of our knowledge (or even the entire documentation) when creating your applications. If you spot some practice or pattern that could be improved, we will be more than grateful when you create an issue about it.


## What should you document?

✅ The best practices and patterns we should use across the entire codebase or in specific situations.

✅ How our development workflow looks like.

✅ Everything related to the overall architecture of the project.

✅ Our technological stack and the reasons for choosing each piece of it.

✅ Larger pieces of functionalities (e.g., theming, translations, authentication).

✅ Standards and processes for everyday tasks we are doing during the development.

## What shouldn't you document?

❌ Particular classes or functions in separation of their modules. Most of the code should be self-documenting. When it comes to the universal parts like helper functions, it would be better to use [TS doc](https://github.com/microsoft/tsdoc).

❌ Things unrelated directly to the programming part of the project. As we have our all-encompassing project knowledge base on another tool, these docs should remain developer-focused.

