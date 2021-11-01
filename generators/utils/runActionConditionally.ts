/* eslint-disable import/no-extraneous-dependencies */
import { ActionConfig, AddActionConfig } from 'node-plop';

import { Answers } from '../types';

interface ActionInput extends ActionConfig, Partial<Omit<AddActionConfig, 'type'>> {}

// ? skip method omits action if returned value is a string
export const runActionIfAnswersWereGiven = (promptNames: string[], action: ActionInput, runIfAnswerWasGiven = true) => {
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
