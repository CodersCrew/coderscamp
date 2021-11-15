import type { NodePlopAPI } from 'plop';

import {
  automationModuleGenerator,
  commandGenerator,
  commandHandlerGenerator,
  domainFunctionGenerator,
  eventGenerator,
  eventHandlerGenerator,
  moduleGenerator,
  restControllerGenerator,
} from './generators';
import { inquirerSelectDirectory } from './generators/_plugins/inquirerSelectDirectory';
import { moduleNameFromPath } from './generators/helpers/moduleNameFromPath';

function plopBuilder(plop: NodePlopAPI) {
  // Plugins
  plop.setPrompt('directory', inquirerSelectDirectory);
  // Helpers
  plop.setHelper('moduleNameFromPath', moduleNameFromPath);
  // Generators
  plop.setGenerator('command', commandGenerator);
  plop.setGenerator('command_handler', commandHandlerGenerator);
  plop.setGenerator('module', moduleGenerator);
  plop.setGenerator('event', eventGenerator);
  plop.setGenerator('domain_function', domainFunctionGenerator);
  plop.setGenerator('rest_controller', restControllerGenerator);
  plop.setGenerator('event_handler', eventHandlerGenerator);
  plop.setGenerator('automation_module', automationModuleGenerator);
}

export default plopBuilder;
