import { domainFunctionActionConfig, domainFunctionTestActionConfig } from './domain-function.action-config';

export const domainFunctionGenerator = {
  description: 'Create a new domain function',
  prompts: [
    {
      type: 'directory',
      name: 'directory',
      basePath: './packages/api/src/',
      message: 'choose directory in which you want to create domain function',
    },
    { type: 'input', name: 'domain-function', message: 'domain function name' },
    {
      type: 'input',
      name: 'command',
      message: 'command name',
    },
    { type: 'input', name: 'event', message: 'past event name' },
  ],
  actions: [domainFunctionActionConfig, domainFunctionTestActionConfig],
};
