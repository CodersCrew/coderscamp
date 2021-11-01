export const createCommandAction = {
  type: 'add',
  path: 'packages/api/src/module/shared/commands/{{dashCase command}}.ts',
  templateFile: './templates/command/command.hbs',
};
