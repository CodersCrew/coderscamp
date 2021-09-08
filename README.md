# CodersCamp

Monorepo containing CodersCamp's internal application, its website, and all development resources created around them.

[![Read the documentation](https://img.shields.io/badge/-Read%20the%20documentation-21B091?style=for-the-badge&logo=markdown&logoColor=white)](https://coderscamp-docs.vercel.app)&#8239;&#8239;&#8239;&#8239;&#8239;
[![Explore component library](https://img.shields.io/badge/-Explore%20component%20library-FF4785?style=for-the-badge&logo=storybook&logoColor=white)](https://coderscamp-storybook.vercel.app/)&#8239;&#8239;&#8239;&#8239;&#8239;
[![See application mockups](https://img.shields.io/badge/-See%20application%20mockups-A259FF?style=for-the-badge&logo=figma&logoColor=white)](https://www.figma.com/file/ur0KLA9ZOtiodrAmpXrxh9/CodersCamp-app-and-website)

| package | issues                              | tests                                       | coverage                                              |
| ------- | ----------------------------------- | ------------------------------------------- | ----------------------------------------------------- |
| api     | [![issues-api][issues-api-badge]]() | [![Action status][workflow]][workflow-link] | [![codecov-api][codecov-api-badge]][codecov-api-link] |
| ui      | [![issues-ui][issues-ui-badge]]()   | [![Action status][workflow]][workflow-link] | [![codecov-ui][codecov-ui-badge]][codecov-ui-link]    |

## What is CodersCamp?

CodersCamp is a 6 month long, free, and open web development bootcamp organized in Poland by the CodersCrew Association.
Our mission is to guide everyone from the first lines of code to a career as a web developer. During the course,
participants receive an interactive learning plan containing 5 modules:

- HTML, CSS, JavaScript - web development basics.
- Scalable web applications with TypeScript.
- Creating REST API clients with Node.js.
- Single-page applications with React.js.
- Module of choice
  - Advanced back-end development with Nest.js.
  - Advanced front-end development with Redux.js.

CodersCamp students work in 6-people teams guided by an experienced mentor. After the end of the module, the team
creates a fully-featured web application and presents it during a demo session. As a result, each student has a
portfolio of 5 practical projects with live demos at the end of the course. The entire bootcamp ends with a 24h
hackathon where participants create an application that meets business requirements specified by the hackathon's
partner.

[codecov-api-badge]: https://codecov.io/gh/CodersCrew/coderscamp/branch/main/graph/badge.svg?flag=api
[codecov-api-link]: https://codecov.io/gh/CodersCrew/coderscamp/tree/main/packages/api/src
[codecov-ui-badge]: https://codecov.io/gh/CodersCrew/coderscamp/branch/main/graph/badge.svg?flag=ui
[codecov-ui-link]: https://codecov.io/gh/CodersCrew/coderscamp/tree/main/packages/ui/src
[issues-api-badge]: https://img.shields.io/github/issues/CodersCrew/coderscamp/scope:%20🛰%20api
[issues-ui-badge]: https://img.shields.io/github/issues/CodersCrew/coderscamp/scope:%20💅%20ui
[workflow]: https://github.com/CodersCrew/coderscamp/workflows/Code%20Check/badge.svg
[workflow-link]: https://github.com/CodersCrew/coderscamp/actions?query=workflow%3A%22Code%20Check%22
