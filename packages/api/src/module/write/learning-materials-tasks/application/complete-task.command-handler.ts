import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { CompleteTaskApplicationCommand } from '@/commands/complete-task.application-command';
import { TaskWasUncompleted } from '@/events/task-was-uncompleted-event.domain-event';
import { TaskWasCompleted } from '@/module/events/task-was-completed.domain-event';
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

    await this.applicationService.execute<TaskWasCompleted | TaskWasUncompleted>(
      eventStream,
      {
        causationId: command.id,
        correlationId: command.metadata.correlationId,
      },
      (pastEvents) => completeTask(pastEvents, command),
    );
  }
}
