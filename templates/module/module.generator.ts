export const moduleGenerator = {
  description: 'Create a new module',
  prompts: [
    {
      type: 'input',
      name: 'module',
      message: 'module name',
    },
    {
      type: 'directory',
      name: 'directory',
      basePath: './packages/api/src/',
      message: 'choose directory in which you want to create module folder',
    },
    {
      name: 'command',
      type: 'input',
      message: 'command name <leave blank to omit>',
    },
    {
      name: 'event',
      type: 'input',
      message: 'command name <leave blank to omit>',
    },
  ],
  actions: [
    {
      type: 'add',
      path: '{{directory}}/{{dashCase module}}/{{dashCase module}}.module.ts',
      templateFile: './templates/module/module.hbs',
    },
    {
      type: 'add',
      path: '{{directory}}/{{dashCase module}}/{{dashCase module}}.test-module.ts',
      templateFile: './templates/module/module.test.hbs',
    },
    {
      type: 'add',
      path: '{{directory}}/{{dashCase module}}/{{dashCase module}}.module.spec.ts',
      templateFile: './templates/module/module.spec.hbs',
    },
  ],
};
