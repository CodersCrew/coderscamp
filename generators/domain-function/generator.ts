import { commandNamePrompt } from '../command/prompts';
import { eventNamePrompt } from '../event/prompts';
import { createDomainFunctionAction, createDomainFunctionTestAction } from './actions';
import { domainFunctionDirectoryPrompt, domainFunctionNamePrompt } from './prompts';

export const domainFunctionGenerator = {
  description: 'Create a new domain function',
  prompts: [
    domainFunctionDirectoryPrompt,
    domainFunctionNamePrompt,
    commandNamePrompt,
    { ...eventNamePrompt, message: 'past event name' },
  ],
  actions: [createDomainFunctionAction, createDomainFunctionTestAction],
};
