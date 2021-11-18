import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { CompleteTaskApplicationCommand } from '@/commands/complete-task';
import { LearningMaterialsTasksDomainEvent } from '@/write/learning-materials-tasks/domain/events';
import { APPLICATION_SERVICE, ApplicationService } from '@/write/shared/application/application-service';
import { EventStreamName } from '@/write/shared/application/event-stream-name.value-object';

import { completeTask } from '../domain/complete-task';

@CommandHandler(CompleteTaskApplicationCommand)
export class CompleteTaskCommandHandler implements ICommandHandler<CompleteTaskApplicationCommand> {
  constructor(
    @Inject(APPLICATION_SERVICE)
    private readonly applicationService: ApplicationService,
  ) {}

  async execute(command: CompleteTaskApplicationCommand): Promise<void> {
    const eventStream = EventStreamName.from('LearningMaterialsTasks', command.data.learningMaterialsId);

    await this.applicationService.execute<LearningMaterialsTasksDomainEvent>(
      eventStream,
      {
        causationId: command.id,
        correlationId: command.metadata.correlationId,
      },
      completeTask(command),
    );
  }
}
