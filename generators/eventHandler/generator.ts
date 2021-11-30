import { createCommandAction } from '../command/actions';
import { commandNamePrompt } from '../command/prompts';
import { createEventAction } from '../event/actions';
import { eventNamePrompt } from '../event/prompts';
import { createEventHandlerAction } from './actions';
import { eventHandlerDirectory } from './prompts';

export const eventHandlerGenerator = {
  description: 'Create a new event handler',
  prompts: [eventHandlerDirectory, commandNamePrompt, eventNamePrompt],
  actions: [
    createEventHandlerAction,
    { ...createCommandAction, skipIfExists: true },
    { ...createEventAction, skipIfExists: true },
  ],
};
