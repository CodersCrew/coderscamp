import { apiDirectoryPrompt } from '../utils/directory.prompt';

export const moduleNamePrompt = {
  type: 'input',
  name: 'module',
  message: 'module name',
};

export const moduleDirectoryPrompt = {
  ...apiDirectoryPrompt,
  message: 'choose directory in which you want to create module folder',
};
