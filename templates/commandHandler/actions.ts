export const createCommandHandlerAction = {
  type: 'add',
  path: '{{directory}}/application/{{dashCase command}}.ts',
  templateFile: './templates/commandHandler/commandHandler.hbs',
};
