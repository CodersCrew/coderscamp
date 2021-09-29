export const commandHandlerGenerator = {
  description: 'Create a new command handler',
  prompts: [
    {
      type: 'input',
      name: 'command',
      message: 'command name',
    },
    { type: 'input', name: 'event', message: 'past event name' },
    { type: 'input', name: 'domainFunction', message: 'domain function name' },
    { type: 'input', name: 'streamCategory', message: 'stream category name' },
    { type: 'input', name: 'streamId', message: 'stream ID' },
  ],
  actions: [
    {
      type: 'add',
      path: 'packages/api/src/module/shared/commands/{{dashCase name}}.ts',
      templateFile: './templates/command/command.hbs',
    },
  ],
};
