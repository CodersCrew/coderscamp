import { commandNamePrompt } from '../command/prompts';
import { domainFunctionNamePrompt } from '../domain-function/prompts';
import { eventNamePrompt } from '../event/prompts';
import { apiDirectoryPrompt } from '../utils/directory.prompt';
import { createCommandHandlerAction } from './actions';
import { streamCategoryPrompt, streamIdPrompt } from './prompts';

export const commandHandlerGenerator = {
  description: 'Create a new command handler',
  prompts: [
    { ...apiDirectoryPrompt, message: 'Path to module' },
    commandNamePrompt,
    { ...eventNamePrompt, message: 'Past event name' },
    domainFunctionNamePrompt,
    streamCategoryPrompt,
    streamIdPrompt,
  ],
  actions: [createCommandHandlerAction],
};
