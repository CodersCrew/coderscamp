import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { UncompleteTaskApplicationCommand } from '@/module/commands/uncomplete-task.application-command';
import { LearningMaterialsTasksDomainEvent } from '@/write/learning-materials-tasks/domain/events';
import { uncompleteTask } from '@/write/learning-materials-tasks/domain/uncomplete-task';
import { APPLICATION_SERVICE, ApplicationService } from '@/write/shared/application/application-service';
import { EventStreamName } from '@/write/shared/application/event-stream-name.value-object';

@CommandHandler(UncompleteTaskApplicationCommand)
export class UncompleteTaskCommandHandler implements ICommandHandler<UncompleteTaskApplicationCommand> {
  constructor(
    @Inject(APPLICATION_SERVICE)
    private readonly applicationService: ApplicationService,
  ) {}

  async execute(command: UncompleteTaskApplicationCommand): Promise<void> {
    const eventStream = EventStreamName.from('LearningMaterialsTasks', command.data.learningMaterialsId);

    await this.applicationService.execute<LearningMaterialsTasksDomainEvent>(
      eventStream,
      {
        causationId: command.id,
        correlationId: command.metadata.correlationId,
      },
      (pastEvents) => uncompleteTask(pastEvents, command),
    );
  }
}
