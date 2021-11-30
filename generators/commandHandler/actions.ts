export const createCommandHandlerAction = {
  type: 'add',
  path: '{{directory}}/application/{{dashCase command}}.command-handler.ts',
  templateFile: './generators/commandHandler/commandHandler.hbs',
};
