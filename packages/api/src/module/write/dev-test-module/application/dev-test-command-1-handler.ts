import { Inject, Logger } from '@nestjs/common';
import { CommandHandler } from '@nestjs/cqrs';

import { DevTestCommand1ApplicationCommand } from '@/module/commands/dev-test-command-1.domain-command';
import { APPLICATION_SERVICE, ApplicationService } from '@/write/shared/application/application-service';
import { EventStreamName } from '@/write/shared/application/event-stream-name.value-object';

import { devTestDomainLogic1 } from '../domain/dev-test-domain-logic-1';
import { DevTestEvent } from '../domain/events';

@CommandHandler(DevTestCommand1ApplicationCommand)
export class DevTestCommand1ApplicationCommandHandler {
  private readonly logger = new Logger(DevTestCommand1ApplicationCommandHandler.name);

  constructor(
    @Inject(APPLICATION_SERVICE)
    private readonly applicationService: ApplicationService,
  ) {}

  async execute(command: DevTestCommand1ApplicationCommand): Promise<void> {
    const eventStream = EventStreamName.from('DevTest', `DevTest_${command.data.id}`);
    const printableCommand = JSON.stringify(command);

    this.logger.log(`executing command(${printableCommand}) on stream(${eventStream.raw})`);
    await this.applicationService.execute<DevTestEvent>(
      eventStream,
      { causationId: command.id, correlationId: command.metadata.correlationId },
      devTestDomainLogic1(command),
    );
  }
}
