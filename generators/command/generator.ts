import { createCommandAction } from './actions';
import { commandNamePrompt } from './prompts';

export const commandGenerator = {
  description: 'Create a new command',
  prompts: [commandNamePrompt],
  actions: [createCommandAction],
};
