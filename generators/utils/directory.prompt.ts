import { Answer } from '../types';

export const directoryPromptValues = {
  directory: 'directory' as Answer,
};

export const apiDirectoryPrompt = {
  type: 'directory',
  name: directoryPromptValues.directory,
  basePath: './packages/api/src/',
};
