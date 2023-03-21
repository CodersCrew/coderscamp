/* eslint-disable @typescript-eslint/no-var-requires */

import { Prompt } from '../types';

const inquirerSelectDirectoryPrompt = require('inquirer-select-directory');

export const inquirerSelectDirectory = inquirerSelectDirectoryPrompt as Prompt;
