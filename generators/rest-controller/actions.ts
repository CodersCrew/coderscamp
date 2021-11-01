import { commandNamePrompt } from '../command/prompts';
import { restControllerDirectory, restControllerNamePrompt } from './prompts';

export const createRestControllerAction = {
  type: 'add',
  path: `{{dashCase ${restControllerDirectory.name}}}/presentation/rest/{{dashCase ${restControllerNamePrompt.name}}}.rest-controller.ts`,
  templateFile: './generators/rest-controller/controller.hbs',
};

export const createTypesFileWithBodyTypeAction = {
  type: 'add',
  path: `./packages/shared/src/models/{{moduleName ${restControllerDirectory.name}}}/{{camelCase ${commandNamePrompt.name}}}RequestBody.ts`,
  template: `export type {{properCase command}}RequestBody = {};`,
  skipIfExists: true,
};
