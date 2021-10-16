import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { Inject } from "@nestjs/common";
import { APPLICATION_SERVICE, ApplicationService } from "@/write/shared/application/application-service";
import { EventStreamName } from "@/write/shared/application/event-stream-name.value-object";
import { TaskWasCompleted } from "@/events/task-was-completed.domain-event";
import { TaskWasUncompleted } from "@/events/task-was-uncompleted-event.domain-event";
import { UncompleteTaskApplicationCommand } from "@/module/commands/uncomplete-task.application-command";
import { uncompleteTask } from "@/write/learning-materials-tasks/domain/uncomplete-task";

@CommandHandler(UncompleteTaskApplicationCommand)
export class UncompleteTaskCommandHandler implements ICommandHandler<UncompleteTaskApplicationCommand> {
  constructor(
    @Inject(APPLICATION_SERVICE)
    private readonly applicationService: ApplicationService,
  ) {}

  async execute(command: UncompleteTaskApplicationCommand): Promise<void> {
    const eventStream = EventStreamName.from('LearningMaterialsTasks', command.data.learningMaterialsId);

    await this.applicationService.execute<TaskWasCompleted | TaskWasUncompleted>(
      eventStream,
      {
        causationId: command.id,
        correlationId: command.metadata.correlationId,
      },
      (pastEvents) => uncompleteTask(pastEvents, command),
    );
  }
}
