export const commandGenerator = {
  description: 'Create a new command',
  prompts: [
    {
      type: 'input',
      name: 'name',
      message: 'command name',
    },
  ],
  actions: [
    {
      type: 'add',
      path: 'packages/api/src/module/shared/commands/{{dashCase name}}.ts',
      templateFile: './templates/command/command.hbs',
    },
  ],
};
