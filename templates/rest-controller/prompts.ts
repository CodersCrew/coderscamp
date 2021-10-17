import { apiDirectoryPrompt } from '../utils/directory.prompt';

export const restControllerDirectory = {
  ...apiDirectoryPrompt,
  message: 'path to module directory',
};

export const restControllerNamePrompt = {
  type: 'input',
  name: 'restController',
  message: 'controller name',
};

export const methodNamePrompt = {
  type: 'input',
  name: 'methodName',
  message: 'controller method name',
};
