import { createEventAction } from './actions';
import { eventNamePrompt } from './prompts';

export const eventGenerator = {
  description: 'Create a new event',
  prompts: [eventNamePrompt],
  actions: [createEventAction],
};
