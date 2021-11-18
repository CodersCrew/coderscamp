import { AsyncReturnType } from 'type-fest';

import { UncompleteTaskApplicationCommand } from '@/commands/uncomplete-task';
import { TaskWasUncompleted } from '@/events/task-was-uncompleted-event.domain-event';
import { CompleteTaskApplicationCommand } from '@/module/commands/complete-task';
import { TaskWasCompleted } from '@/module/events/task-was-completed.domain-event';

import { EventStreamName } from '../shared/application/event-stream-name.value-object';
import { learningMaterialsTasksTestModule } from './learning-materials-tasks.test-module';

enum CommandType {
  COMPLETE_TASK = 'Complete Task',
  UNCOMPLETE_TASK = 'Uncomplete Task',
}

describe('learning materials tasks', () => {
  let module: AsyncReturnType<typeof learningMaterialsTasksTestModule>;
  const commandBuilder = (
    type: string,
    taskId = 'VmkxXnPG02CaUNV8Relzk',
    learningMaterialsId = 'ZpMpw2eh1llFCGKZJEN6r',
  ) => ({
    class: type === CommandType.COMPLETE_TASK ? CompleteTaskApplicationCommand : UncompleteTaskApplicationCommand,
    type,
    data: { taskId, learningMaterialsId },
  });

  beforeEach(async () => {
    module = await learningMaterialsTasksTestModule();
  });

  afterEach(async () => {
    await module.close();
  });

  it('should change state of the task to complete', async () => {
    // Given
    const command = commandBuilder(CommandType.COMPLETE_TASK);

    // When
    await module.executeCommand(() => command);

    // Then
    await module.expectEventPublishedLastly<TaskWasCompleted>({
      type: 'TaskWasCompleted',
      data: {
        learningMaterialsId: command.data.learningMaterialsId,
        taskId: command.data.taskId,
      },
      streamName: EventStreamName.from('LearningMaterialsTasks', command.data.learningMaterialsId),
    });
  });

  it('should not change task state if task is already completed', async () => {
    // Given
    const command = commandBuilder(CommandType.COMPLETE_TASK);

    // When
    await module.executeCommand(() => command);

    // Then
    await expect(() => module.executeCommand(() => command)).rejects.toThrow();
  });

  it('should change state of the task to uncomplete when task was completed already', async () => {
    // Given
    const completeCommand = commandBuilder(CommandType.COMPLETE_TASK);
    const uncompleteCommand = commandBuilder(CommandType.UNCOMPLETE_TASK);

    await module.executeCommand(() => completeCommand);

    // When
    await module.executeCommand(() => uncompleteCommand);

    // Then
    module.expectEventPublishedLastly<TaskWasUncompleted>({
      type: 'TaskWasUncompleted',
      data: {
        learningMaterialsId: uncompleteCommand.data.learningMaterialsId,
        taskId: uncompleteCommand.data.taskId,
      },
      streamName: EventStreamName.from('LearningMaterialsTasks', uncompleteCommand.data.learningMaterialsId),
    });
  });

  it('should not change state of the task to uncomplete if task was not completed before', async () => {
    // Given
    const uncompleteCommand = commandBuilder(CommandType.UNCOMPLETE_TASK);

    // When&Then
    await expect(() => module.executeCommand(() => uncompleteCommand)).rejects.toThrow(
      'Can not uncomplete task that was not completed yet.',
    );
  });
});
