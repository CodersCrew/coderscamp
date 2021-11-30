import { createCommandAction } from '../command/actions';
import { commandNamePrompt } from '../command/prompts';
import { eventNamePrompt } from '../event/prompts';
import { createEventHandlerAction } from '../eventHandler/actions';
import {moduleDirectoryPrompt, moduleNamePrompt} from '../module/prompts';
import {createEventAction} from '../event/actions';
import { createAutomationModuleAction, createAutomationTestFileAction, createAutomationTestModuleAction } from './actions';

export const automationModuleGenerator = {
  description: 'Create a new automation module',
  prompts: [moduleDirectoryPrompt, moduleNamePrompt, commandNamePrompt, eventNamePrompt],
  actions: [
    { ...createEventHandlerAction, path: '{{directory}}/{{dashCase module}}/{{dashCase event}}.event-handler.service.ts'},
    { ...createCommandAction, skipIfExists: true },
    { ...createEventAction, skipIfExists: true },
    createAutomationModuleAction,
    createAutomationTestModuleAction,
    createAutomationTestFileAction,
  ],
};
