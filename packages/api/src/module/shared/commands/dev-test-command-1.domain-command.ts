import { AbstractApplicationCommand } from '../application-command-events';

export type DevTestCommand1 = {
  type: 'DevTestCommand1';
  data: { id: number; counter: number };
};

export const devTestCommand1 = (data: DevTestCommand1['data']): DevTestCommand1 => ({
  type: 'DevTestCommand1',
  data,
});

export class DevTestCommand1ApplicationCommand extends AbstractApplicationCommand<DevTestCommand1> {}
