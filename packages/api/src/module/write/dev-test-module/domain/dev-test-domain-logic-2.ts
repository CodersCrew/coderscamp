import { Logger } from '@nestjs/common';

import { DevTestCommand2ApplicationCommand } from '@/module/commands/dev-test-command-2.domain-command';
import { devTestEvent2 } from '@/module/events/dev-test-event-2.domain-event.';

import { DevTestEvent } from './events';

export const devTestDomainLogic2 =
  (command: DevTestCommand2ApplicationCommand) =>
  (pastEvents: DevTestEvent[]): DevTestEvent[] => {
    const logger = new Logger(devTestDomainLogic2.name);
    const prevValue = pastEvents.reduce((p, e) => p + e.data.counter, 0);
    const newValue = prevValue - command.data.counter;

    logger.log(`executing domain logic prevCounter(${prevValue}) newCounter(${newValue})`);

    return [
      devTestEvent2({
        id: command.data.id,
        counter: command.data.counter,
        desc: `Event -${command.data.counter} generated from command ${JSON.stringify(command.data)}`,
      }),
    ];
  };
