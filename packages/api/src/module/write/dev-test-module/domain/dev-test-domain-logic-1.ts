import { Logger } from '@nestjs/common';

import { DevTestCommand1ApplicationCommand } from '@/module/commands/dev-test-command-1.domain-command';
import { devTestEvent1 } from '@/module/events/dev-test-event-1.domain-event';

import { DevTestEvent } from './events';

export const devTestDomainLogic1 =
  (command: DevTestCommand1ApplicationCommand) =>
  (pastEvents: DevTestEvent[]): DevTestEvent[] => {
    const logger = new Logger(devTestDomainLogic1.name);
    const prevValue = pastEvents.reduce((p, e) => p + e.data.counter, 0);
    const newValue = prevValue + command.data.counter;

    logger.log(`executing domain logic prevCounter(${prevValue}) newCounter(${newValue})`);

    return [
      devTestEvent1({
        id: command.data.id,
        counter: command.data.counter,
        desc: `Event +${command.data.counter} generated from command ${JSON.stringify(command.data)}`,
      }),
    ];
  };
