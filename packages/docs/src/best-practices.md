---
title: Best practices
description: What are the practices we agreed to follow when working on the project?
sidebar_position: 6
---

## Pull requests and code review

### As author

- **Create small pull requests** - one pull request shouldn't contain more than 400 lines of added code. Of course, it doesn't count SVGs, yarn.lock, and other files with content that don't need to be reviewed. If during task estimation you fill that created PR will be larger than that, mention it so we could try to divide one big task into a few smaller ones.

- **Become your first reviewer** - before you open a pull request, do a review on yourself. When you implement something across many days, it's easy to forget about some minor details that could better your code. By looking at the result on GitHub from a bird's eye view, there is a chance you will see new ways to make the code better.

- **Start with a draft, wait for the green** - when you open a PR, many code checks will run automatically. To reduce the chance, you will summon your team to a broken PR, create a draft and wait for it to pass all code checks. Also, remember to check if your code works as intended on preview environments and if you didn't break any of them.

- **Annotate** - your reviewers wouldn't know as much about your reasoning behind some solutions as you do. If there are more problematic parts and places where you needed to do "this one trick to make it work," leave a comment about it. Your reviewers would probably ask about them anyway, but you can respect their time by noticing them.

- **React, apply, resolve** - when you see a comment you agree with, give your reviewer some response. It could be simple thumbs up (👍) reaction or comment like "You're right, I will do it". Then, after applying changes, remember to click the "Resolve conversation" button, so the reviewer will know that their suggestion has been applied.

### As reviewer

- **Just do it** - make code review your priority. When you plan to start work on the project, firstly open GitHub and check if there are no PRs that wait for your review. A large number of hanging PRs can result in many troubles like a significant amount of code to check at once, many merge conflicts, slower product delivery, PR authors losing context, etc. Remember that we rate our productivity by the number of features we can deliver in one sprint, not by the number of PRs we can open in that period.

- **Test the functionality** - remember not only to review the code but also check if the entire functionality works as intended. Each PR has preview environments linked to each app, so you don't even need to pull the code on your machine.

- **Make suggestions instead of orders** - when a good solution comes to your mind, you may be tempted to order the author to apply it (Do X, Rewrite Y, Delete Z, etc.). It could make the author apply changes but also change the tone of the conversation from "we work together to make the code better" to "don't question my authority and do what I require". To make PR more a conversation than a chain of command, try to ask open questions or make suggestions about things (I think it would be better to X, What do you think about Y, Maybe we should Z, etc.).

- **Explain why** - don't suggest changes without the reasoning that stands behind it. Spend some time to justify your opinion, mainly if the proposed change results from your personal preferences or non-written standards. To make it easier, remember that your comment should answer at least two questions: what should be done? why should it be done?

- **Ask questions** - code review is not only about suggesting changes. If you don't feel confident reading a specific part of the code, don't be afraid to ask a question about it. Remember that code review is one of the ways to share knowledge related to our codebase.

- **Praise good work** - when code review is mostly about pointing out imperfections, you don't have to limit yourself to this type of comments. When you notice a smart solution or learn something from a particular part of the code, write a comment and show your appreciation.

### Code review checklist

**If yes, write about it:**

[] Are there any code parts that are too complex (can't be understood quickly or without additional explanation)?
[] Do you see the potential for some abstractions that can make code more DRY?
[] Are there any documentation parts that should be updated?
[] Are there any edge cases that could break implemented feature?
[] Does this code implements anything that we "might need in the future," but it's not used right now?

**If no, write about it:**

[] Does this code accomplish all acceptance criteria specified for the related issue?
[] Does the code style follow our guidelines? Is it consistent with previous similar solutions?
[] Does this code has all the necessary tests? Is it regression-proof?
[] Does the developer use clear names for everything?
[] Are eventual comments clear and valuable. Do they explain "why" instead of "what"?

### Comment emojis

PR comments aren't equal. Sometimes we want to only ask about some functionality, and sometimes, we genuinely care if a change wouldn't break the entire app. To make comment intention easier to recognize, we decided to always prefix it with one of the emojis below.

| Emoji | Meaning      | Description                                                                                                                                                        |
|-------|--------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| 🚨    | Problem      | Here is an actual problem. It's possibly an error or strongly violates our conventions. It has to be resolved before the merge and re-reviewed by the author.      |
| 🤔    | Concern      | This is a concern that I feel is worth addressing. It has to be resolved before the merge and re-reviewed by the author.                                           |
| ❓    | Question     | There is nothing to be changed yet. It has to be answered before merge but doesn't require the author's re-review to allow merge.                                  |
| 💭    | Idea         | I think it would improve things, but feel free to disagree. It can be resolved/answered before merge but doesn't have to.                                          |
| 🙃    | Nitpick      | Feel free to change or leave it. It may include stylistic suggestions that should likely be prevented by linting if they matter.                                   |
| 🏕️    | Improvement  | It's not blocking and unrelated to the changes made, but we have an opportunity to leave things better than we found them.                                         |
| 📌    | New issue    | This is a concern that is out of scope and should be staged appropriately for follow-up. A new issue should be created and linked in the comment.                  |
| 👍    | I like this! | No action needed. I just wanted to say "good job".                                                                                                                 |

## Writing code

### Avoid magic numbers

**🕐 When**

You want to provide some number value to a function.

**🚨 Don't**

```ts
// Why we want a timeout of exactly 172800000 milliseconds?
setTimeout(createDatabaseSnapshot, 172800000);
```

**✅ Do**

```ts
const TWO_DAYS_IN_MILLISECONDS = 2 * 24 * 60 * 60 * 1000; //172800000;

setTimeout(myFunc, TWO_DAYS_IN_MILLISECONDS);
```

**🧐 Why?**

- It allows us to think about the knowledge the number represents rather than worrying about the number itself.
- Magic numbers become incredibly confusing when the same number is used for different purposes in one code section.
- It is easier to alter the value of the number, as it is not duplicated. Changing the value of a magic number is error-prone because the same value is often used several times in different places within a program.
- It encourages and facilitates documentation. The single place where the named variable is declared makes a good place to document what the value means and why it has the value it does.

**🧠 Think about it**

Not every number passed to the function is a magic number. Below you can find a few cases when passing a number directly to the function isn't a mistake:
1. Function explains the number: In `getUserById(3)`, we know that `3` is a user id.
2. Number doesn't have any meaning beyond its value. In `padding(12)` we know that the number is just a padding value we want for a particular element and doesn't mean anything more. There's no reason for creating additional variables like `PADDING_12`, `PADDING_ALL_SIDES`, or `BUTTON_PADDING`.

**📄 Read more**

- [Avoiding Magic Numbers](https://www.pluralsight.com/tech-blog/avoiding-magic-numbers/)
- [When is two a magic number?](https://www.codereadability.com/is-two-a-magic-number-in-programming/)


### Use type literals instead of enums

**🕐 When**

You want to express that some type could has one of a few predefined values.

**🚨 Don't**

```ts
enum Answer {
  No,
  Maybe,
  Yes,
}

function submitAnswer(answer: Answer) {}
```

```ts
enum Color {
  Red = 'RED',
  Green = 'GREEN',
  Blue = 'BLUE',
}

function setThemeColor(color: Color) {}
```

**✅ Do**

```ts
type Answer = 0 | 1 | 2;

function submitAnswer(answer: Answer) {}
```

```ts
type Color = 'RED' | 'GREEN' | 'BLUE';

function setThemeColor(color: Color) {}
```

**🧐 Why?**

- When compiled enums generates unnecessary boilerplate.
- Enums need to be imported in every file where you want to use them.
- Unions can be easily extended when enums cannot.
- Regular numeric enums aren't type-safe. You can pass any number in places when you expect their types.
- You wouldn't need to write the default case in the switch statement if you used all union's values in its cases. Additionally, you will be warned if you have no default case and didn't handle all union values in other cases.

**📄 Read more**

- [Tidy TypeScript: Prefer union types over enums](https://fettblog.eu/tidy-typescript-avoid-enums)
- [Should You Use Enums or Union Types in Typescript?](https://blog.bam.tech/developer-news/should-you-use-enums-or-union-types-in-typescript)


### Prefer type aliases over interfaces

**🕐 When**

You want to define a new type.

**🚨 Don't**

```ts
interface UserCardProps {
  fullName: string;
  age: number;
}
```

```ts
interface FindUserById {
  (id: number): User
}
```

**✅ Do**

```ts
type UserCardProps = {
  fullName: string;
  age: number;
}
```

```ts
type FindUserById = (id: number) => User;
```

**🧐 Why?**

- As interfaces allow for declaration merging, they can cause troubles in two ways. Firstly we can extend an interface that already exists in the global scope, leading to many unpredictable errors. Secondly, there is a risk we will define two interfaces with the same name that will merge into one without our knowledge.
- Type aliases are more composable as they create both unions (`|`) and merged types (`&`).
- Type aliases prevent us from their redeclaration, so they are more stable across the codebase.

**🟠 Exception**

- For reusable components defined in the `packages/ui` directory, use interfaces to define properties because Storybook cannot infer props descriptions from type aliases.

**🧠 Think about it**

There are at least two situations when interfaces with their declaration merging possibilities are a more suitable solution than type aliases:
1. We're adding types to a public API's definition when authoring a library or 3rd party ambient type definitions. In such a case, it's beneficial to allow the library user to extend our types via declaration merging if some definitions are missing.
2. Type extending is something we need for our type to maintain its purpose. An excellent example of this is [emotion's `Theme` type](https://emotion.sh/docs/typescript#define-a-theme), which should be customizable for each project using the library.

**📄 Read more**

- [Tidy TypeScript: Prefer type aliases over interfaces](https://fettblog.eu/tidy-typescript-prefer-type-aliases)
- [Interface vs Type alias in TypeScript 2.7](https://medium.com/@martin_hotell/interface-vs-type-alias-in-typescript-2-7-2a8f1777af4c)
- [TypeScript Types or Interfaces for React component props](https://dev.to/reyronald/typescript-types-or-interfaces-for-react-component-props-1408)