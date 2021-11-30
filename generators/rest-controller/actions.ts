import { commandNamePrompt } from '../command/prompts';
import { Answers } from '../types';
import { restControllerDirectory, restControllerNamePrompt } from './prompts';

export const createRestControllerAction = {
  type: 'add',
  path: `{{${restControllerDirectory.name}}}/presentation/rest/{{dashCase ${restControllerNamePrompt.name}}}.rest-controller.ts`,
  templateFile: './generators/rest-controller/controller.hbs',
  transform: (content: string, answers: Answers): string => {
    if (answers?.module) {
      const splittedDirectory = answers.directory.split('\\');
      const dashCaseModuleName = answers.module
        .replace(/([A-Z])/g, '-$1')
        .toLowerCase()
        .replace('-', '');

      return content.replace(splittedDirectory[splittedDirectory.length - 1], dashCaseModuleName);
    }

    return content;
  },
};

export const createTypesFileWithBodyTypeAction = {
  type: 'add',
  path: `./packages/shared/src/models/{{moduleNameFromPath ${restControllerDirectory.name}}}/{{camelCase ${commandNamePrompt.name}}}RequestBody.ts`,
  template: `export type {{properCase command}}RequestBody = {};`,
  skipIfExists: true,
};
