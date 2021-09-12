import { AbstractApplicationCommand } from '../application-command-events';

export type DevTestCommand2 = {
  type: 'DevTestCommand2';
  data: { id: number; counter: number };
};

export const devTestCommand2 = (data: DevTestCommand2['data']): DevTestCommand2 => ({
  type: 'DevTestCommand2',
  data,
});

export class DevTestCommand2ApplicationCommand extends AbstractApplicationCommand<DevTestCommand2> {}
