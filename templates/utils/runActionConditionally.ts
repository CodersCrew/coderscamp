/* eslint-disable import/no-extraneous-dependencies */
import { ActionConfig, ActionType } from 'node-plop';

import { Answers } from '../types';
import { doesFileExist } from './fileExists';

// ? skip method omits action if returned value is a string
export const runActionIfAnswersWereGiven = (
  promptNames: string[],
  action: ActionConfig,
  runIfAnswerWasGiven = true,
): ActionType => {
  return {
    ...action,
    skip: (answers: Answers) => {
      return promptNames.reduce<boolean | string>((skipAction, promptName) => {
        if (skipAction === 'skip') return 'skip';

        if (runIfAnswerWasGiven) {
          return answers[promptName] !== '' ? false : 'skip';
        }

        return answers[promptName] === '' ? false : 'skip';
      }, false);
    },
  };
};

export const runActionIfFileDoesNotExist = (filePath: string, action: ActionConfig): ActionType => {
  return {
    ...action,
    skip: () => {
      return doesFileExist(filePath) ? 'skip' : false;
    },
  };
};
