import { createCommandAction } from '../command/actions';
import { commandNamePrompt } from '../command/prompts';
import { createCommandHandlerAction } from '../commandHandler/actions';
import { streamCategoryPrompt } from '../commandHandler/prompts';
import { createDomainFunctionAction, createDomainFunctionTestAction } from '../domain-function/actions';
import { domainFunctionNamePrompt } from '../domain-function/prompts';
import { createEventAction } from '../event/actions';
import { eventNamePrompt } from '../event/prompts';
import { createRestControllerAction, createTypesFileWithBodyTypeAction } from '../rest-controller/actions';
import { methodNamePrompt, restControllerNamePrompt } from '../rest-controller/prompts';
import type { Answers } from '../types';
import { runActionIfAnswersWereGiven } from '../utils/runActionConditionally';
import { createModuleAction, createTestFileAction, createTestModuleAction } from './actions';
import { moduleDirectoryPrompt, moduleNamePrompt } from './prompts';

export const moduleGenerator = {
  description: 'Create a new module',
  prompts: [
    moduleNamePrompt,
    moduleDirectoryPrompt,
    commandNamePrompt,
    eventNamePrompt,
    { ...domainFunctionNamePrompt, when: (answers: Answers) => answers[eventNamePrompt.name] !== '' },
    { ...streamCategoryPrompt, when: (answers: Answers) => answers[domainFunctionNamePrompt.name] !== '' },
    { ...restControllerNamePrompt },
    methodNamePrompt,
  ],
  actions: [
    { ...createCommandAction, skipIfExist: true },
    { ...createEventAction, skipIfExist: true },
    createModuleAction,
    createTestModuleAction,
    runActionIfAnswersWereGiven([commandNamePrompt.name, eventNamePrompt.name], createTestFileAction),
    runActionIfAnswersWereGiven([domainFunctionNamePrompt.name, streamCategoryPrompt.name], {
      ...createDomainFunctionAction,
      path: `{{${moduleDirectoryPrompt.name}}}/{{dashCase ${moduleNamePrompt.name}}}/domain/{{dashCase ${domainFunctionNamePrompt.name}}}.ts`,
    }),
    runActionIfAnswersWereGiven([domainFunctionNamePrompt.name, streamCategoryPrompt.name], {
      ...createDomainFunctionTestAction,
      path: `{{${moduleDirectoryPrompt.name}}}/{{dashCase ${moduleNamePrompt.name}}}/domain/{{dashCase ${domainFunctionNamePrompt.name}}}.spec.ts`,
    }),
    {
      ...createCommandHandlerAction,
      path: `{{${moduleDirectoryPrompt.name}}}/{{dashCase ${moduleNamePrompt.name}}}/application/{{dashCase ${commandNamePrompt.name}}}.command-handler.ts`,
    },
    {
      ...createRestControllerAction,
      path: `{{${moduleDirectoryPrompt.name}}}/{{dashCase ${moduleNamePrompt.name}}}/presentation/rest/{{dashCase ${restControllerNamePrompt.name}}}.rest-controller.ts`,
    },
    {
      ...createTypesFileWithBodyTypeAction,
      path: `./packages/shared/src/models/{{dashCase ${moduleNamePrompt.name}}}/{{camelCase ${commandNamePrompt.name}}}RequestBody.ts`,
      skipIfExist: true,
    },
  ],
};
