import { createCommandAction } from '../command/actions';
import { commandNamePrompt } from '../command/prompts';
import { createRestControllerAction, createTypesFileWithBodyTypeAction } from './actions';
import { methodNamePrompt, restControllerDirectory, restControllerNamePrompt } from './prompts';

export const restControllerGenerator = {
  description: 'Create a new rest controller',
  prompts: [restControllerDirectory, restControllerNamePrompt, methodNamePrompt, commandNamePrompt],
  actions: [
    createRestControllerAction,
    createTypesFileWithBodyTypeAction,
    { ...createCommandAction, skipIfExists: true },
  ],
};
