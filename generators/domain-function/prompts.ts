import { apiDirectoryPrompt } from '../utils/directory.prompt';

export const domainFunctionDirectoryPrompt = {
  ...apiDirectoryPrompt,
  message: 'choose directory in which you want to create domain function',
};

export const domainFunctionNamePrompt = { type: 'input', name: 'domainFunction', message: 'domain function name' };
