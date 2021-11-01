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

const createDomainFunctionPath = `{{${moduleDirectoryPrompt.name}}}/{{dashCase ${moduleNamePrompt.name}}}/domain/{{dashCase ${domainFunctionNamePrompt.name}}}.ts`;
const createDomainFunctionTestPath = `{{${moduleDirectoryPrompt.name}}}/{{dashCase ${moduleNamePrompt.name}}}/domain/{{dashCase ${domainFunctionNamePrompt.name}}}.spec.ts`;
const createCommandHandlerPath = `{{${moduleDirectoryPrompt.name}}}/{{dashCase ${moduleNamePrompt.name}}}/application/{{dashCase ${commandNamePrompt.name}}}.command-handler.ts`;
const createRestControllerPath = `{{${moduleDirectoryPrompt.name}}}/{{dashCase ${moduleNamePrompt.name}}}/presentation/rest/{{dashCase ${restControllerNamePrompt.name}}}.rest-controller.ts`;
const createTypesFileWithBodyTypePath = `./packages/shared/src/models/{{dashCase ${moduleNamePrompt.name}}}/{{camelCase ${commandNamePrompt.name}}}RequestBody.ts`;

export const moduleGenerator = {
  description: 'Create a new module',
  prompts: [
    moduleNamePrompt,
    moduleDirectoryPrompt,
    commandNamePrompt,
    eventNamePrompt,
    domainFunctionNamePrompt,
    { ...streamCategoryPrompt, when: (answers: Answers) => answers[domainFunctionNamePrompt.name] !== '' },
    restControllerNamePrompt,
    { ...methodNamePrompt, when: (answers: Answers) => answers[restControllerNamePrompt.name] !== '' },
  ],
  actions: [
    { ...createCommandAction, skipIfExists: true },
    { ...createEventAction, skipIfExists: true },
    createModuleAction,
    createTestModuleAction,
    createTestFileAction,
    {
      ...createDomainFunctionAction,
      path: createDomainFunctionPath,
    },
    runActionIfAnswersWereGiven([domainFunctionNamePrompt.name, streamCategoryPrompt.name], {
      ...createDomainFunctionTestAction,
      path: createDomainFunctionTestPath,
    }),
    {
      ...createCommandHandlerAction,
      path: createCommandHandlerPath,
    },
    runActionIfAnswersWereGiven([restControllerNamePrompt.name, methodNamePrompt.name], {
      ...createRestControllerAction,
      path: createRestControllerPath,
    }),
    runActionIfAnswersWereGiven([restControllerNamePrompt.name, methodNamePrompt.name], {
      ...createTypesFileWithBodyTypeAction,
      path: createTypesFileWithBodyTypePath,
      skipIfExists: true,
    }),
  ],
};
