import { eventHandlerDirectory } from './prompts';

export const createEventHandlerAction = {
  type: 'add',
  path: `{{directory}}/{{moduleNameFromPath ${eventHandlerDirectory.name}}}.ts`,
  templateFile: './generators/eventHandler/eventHandler.hbs',
};
