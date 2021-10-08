/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable import/no-default-export */
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import inquirerSelectDirectory from 'inquirer-select-directory';
import { NodePlopAPI } from 'plop';

import {
  commandGenerator,
  commandHandlerGenerator,
  domainFunctionGenerator,
  eventGenerator,
  moduleGenerator,
} from './templates';

export default function (plop: NodePlopAPI) {
  // Plugins
  plop.setPrompt('directory', inquirerSelectDirectory);
  // Generators
  plop.setGenerator('command', commandGenerator);
  plop.setGenerator('commandHandler', commandHandlerGenerator);
  plop.setGenerator('moduleGenerator', moduleGenerator);
  plop.setGenerator('event', eventGenerator);
  plop.setGenerator('domain-function', domainFunctionGenerator);
}
